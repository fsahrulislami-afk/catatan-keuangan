let dataKeuangan = JSON.parse(localStorage.getItem("keuangan")) || [];

const form = document.getElementById("formKeuangan");
const tabel = document.getElementById("tabelData");
const saldoText = document.getElementById("saldo");

// Fungsi Format Rupiah
function formatRupiah(angka) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0
  }).format(angka);
}

function renderData() {
  tabel.innerHTML = "";
  let saldo = 0;

  dataKeuangan.forEach((item, index) => {
    const row = document.createElement("tr");

    if (item.jenis === "Pemasukan") saldo += item.jumlah;
    else saldo -= item.jumlah;

    // CSS class untuk warna jenis
    const jenisClass = item.jenis === "Pemasukan" ? "pemasukan" : "pengeluaran";

    row.innerHTML = `
      <td>${item.tanggal}</td>
      <td><strong>${item.keterangan}</strong></td>
      <td><span class="badge ${jenisClass}">${item.jenis}</span></td>
      <td>${formatRupiah(item.jumlah)}</td>
      <td><button class="btn-hapus" onclick="hapusData(${index})">Hapus</button></td>
    `;

    tabel.appendChild(row);
  });

  saldoText.textContent = formatRupiah(saldo);
  localStorage.setItem("keuangan", JSON.stringify(dataKeuangan));
}

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const dataBaru = {
    tanggal: document.getElementById("tanggal").value,
    keterangan: document.getElementById("keterangan").value,
    jenis: document.getElementById("jenis").value,
    jumlah: parseInt(document.getElementById("jumlah").value)
  };

  dataKeuangan.push(dataBaru);
  form.reset();
  renderData();
});

function hapusData(index) {
  if(confirm("Yakin ingin menghapus data ini?")) {
    dataKeuangan.splice(index, 1);
    renderData();
  }
}

renderData();