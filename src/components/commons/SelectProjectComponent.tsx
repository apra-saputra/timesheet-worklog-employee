import React from "react";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

// Tipe yang mengharuskan adanya id dan name
interface HasIdAndName {
  id: number | string;
  name: string;
}

// Tipe Props untuk SelectProjectComponent
interface SelectProjectComponentProps<T extends HasIdAndName> {
  variable: number | string;
  onChange: (value: string) => void;
  data: T[];
  placeholder?: string;
}

// Definisi komponen generik dengan T extends HasIdAndName
const SelectProjectComponent = <T extends HasIdAndName>({
  variable,
  onChange,
  data,
  placeholder,
}: SelectProjectComponentProps<T>) => {
  return (
    <Select
      onValueChange={onChange}
      value={typeof variable === "number" ? variable.toString() : variable}
    >
      <SelectTrigger className="bg-background/85 drop-shadow-lg ">
        <SelectValue placeholder={placeholder ? placeholder : "Select Value"} />
      </SelectTrigger>

      <SelectContent>
        {data?.length &&
          data.map((el) => (
            <SelectItem value={`${el.id}`} key={el.id}>
              {el.name}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
};

export default SelectProjectComponent;
