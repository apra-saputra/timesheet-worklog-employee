# Timesheet Worklog Dashboard - Requirement

## 1. Fitur Utama
- **Pencatatan Waktu Kerja (Timesheet Worklog)**:
  - Setiap karyawan mencatat waktu kerja harian mereka untuk setiap proyek yang sedang dikerjakan.
  - Batas waktu kerja per hari: 8 jam.
  - Jika karyawan menyelesaikan 8 jam di sebuah proyek, nilai untuk proyek tersebut adalah 1.
  - Pada akhir bulan, dilakukan perhitungan total waktu kerja (total jam proyek) dibagi dengan jumlah hari kerja dalam bulan tersebut (total work / total month of work).

## 2. Kasus Khusus yang Harus Ditangani
1. **Karyawan menyelesaikan proyek dalam 1 bulan**:
   - Jika karyawan hanya bekerja dalam satu proyek selama sebulan, mereka harus menyelesaikan 8 jam per hari untuk mendapatkan nilai 1 per hari untuk proyek tersebut.
   
2. **Karyawan bekerja di lebih dari 1 proyek dalam 1 hari**:
   - Karyawan mungkin bekerja pada dua proyek dalam satu hari (contoh: Batu 4 jam, Malang 4 jam). Nilai harian dipecah berdasarkan proyek yang dikerjakan, tetapi total waktu kerja masih tidak boleh melebihi 8 jam per hari.

3. **Karyawan bekerja di lebih dari 1 proyek dalam satu bulan**:
   - Jika karyawan bekerja di lebih dari satu proyek dalam satu bulan (misalnya Batu 8 jam, Malang 8 jam), sistem harus mencatat waktu untuk masing-masing proyek, dan pada akhir bulan perhitungan dilakukan untuk masing-masing proyek secara terpisah.

4. **Absensi karyawan**:
   - Jika karyawan absen dalam satu hari (tidak ada jam kerja yang dicatat), absensi tersebut harus dicatat dan masuk dalam laporan.

## 3. Komponen Dashboard yang Dibutuhkan
1. **Form Input Timesheet**:
   - Karyawan bisa memasukkan waktu kerja harian untuk masing-masing proyek yang sedang dikerjakan.
   - Input form ini memungkinkan pencatatan waktu kerja untuk lebih dari satu proyek per hari.
   
2. **Validasi Waktu Kerja**:
   - Pastikan waktu kerja yang dimasukkan tidak melebihi 8 jam per hari.
   - Periksa apakah total jam kerja untuk satu proyek atau lebih dalam sehari tidak melebihi 8 jam.

3. **Laporan Bulanan**:
   - Sistem harus bisa menghasilkan laporan bulanan yang menunjukkan:
     - Total jam kerja untuk setiap proyek.
     - Rata-rata jam kerja harian (total work / total month of work).
     - Jumlah absensi karyawan (hari di mana tidak ada waktu kerja yang tercatat).

4. **Pengelolaan Proyek**:
   - Karyawan bisa memilih proyek yang mereka kerjakan dari daftar proyek yang sedang aktif.

5. **Pengelolaan Absensi**:
   - Jika karyawan absen, sistem harus dapat mencatat absensi tersebut dan mempengaruhi perhitungan laporan bulanan.

## 4. Alur Sistem
1. **Input Data**:
   - Karyawan memasukkan data jam kerja harian untuk satu atau beberapa proyek.
   - Sistem memvalidasi jumlah jam kerja per hari agar tidak melebihi batas 8 jam.
   
2. **Pengolahan Data**:
   - Sistem menghitung total jam kerja per proyek dalam satu bulan.
   - Sistem membagi total jam kerja dengan jumlah hari kerja dalam bulan untuk mendapatkan rata-rata jam kerja harian (total work / total month of work).

3. **Output Data**:
   - Laporan bulanan berisi informasi tentang total jam kerja, proyek yang dikerjakan, dan absensi karyawan.

## 5. Catatan Tambahan
- **Penanganan Absen**:
  - Jika tidak ada input untuk satu hari, sistem menganggap karyawan absen dan mencatatnya dalam laporan.
  
- **Pengaturan Hari Kerja Bulanan**:
  - Perlu disesuaikan dengan jumlah hari kerja yang berlaku (misalnya, apakah Sabtu/Minggu dihitung sebagai hari libur atau hari kerja).

## 6. Kebutuhan Data
1. **Data Karyawan**:
   - Nama, ID, dan informasi proyek yang sedang dikerjakan.
   
2. **Data Proyek**:
   - Nama proyek, lokasi, dan ID proyek.
   
3. **Data Waktu Kerja**:
   - Tanggal, jumlah jam kerja, dan proyek yang dikerjakan.
