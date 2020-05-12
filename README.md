# peacefulhack.github.io<br>
<b>1. Set-up database</b><br>
	pada database, buat database bernama "crud_vue" (dapat diganti sesuai minat). buat tabel didalamnya bernama users (id,name,nrp,email)
	pada id saya buat Auto Increment, nrp dan email saya buat unique.<br><br>
<b>2. Set-Up koneksi</b><br>
	pada folder controller terdapat conn.php. pada line 3, ubah nama databse sesuai nama database anda, defaultnya "crud_vue"
	pada file yang sama, set up data yang dibutuhkan pada line 26 dan 42 defaultnya name nrp dan email dan id<br><br>
<b>3. Set-up Vue</b><br>
	pada folder assets/js terdapat file main.js -> yang harus anda ganti adalah url pada get dan post method menjadi folder anda.
	defaultnya adalah http://localhost/2019/belajar/crudvue, dapat anda ganti menjadi tempat akses anda.
	pada line 10, ganti Data sebanyak yg anda inginkan.<br><br>
<b>4. Set-up HTML</b><br>
	pada tabel line 70-73, silakan ganti atau tambahkan data yang anda inginkan
	pada setiap modal(create(line 84), update(line 114), dan delete(line 143)) silakan tambahkan data sesuai keinginanan, jangan lupa tambah v-model untuk memasukkan parameter variabel didalam JS nya
	<br><br>

<b><i>Helper oleh Pembuat:</i></b><br>
pada JS terdapat 2 model yang dapat anda pakai, pertama currentUser->memanggil var user dari database, dan newUser-> membuat user ke database(tapi tidak langsung auto create, harus ditekan button create)
terdapat 2 modal info, 1. Error 2. Sukses

terima kasih

mikail
