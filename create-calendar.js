export const aylar = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
export let suAnkiTarih = new Date();

// İŞTE KAYBOLAN VE SİSTEMİ ÇÖKERTEN FONKSİYONUMUZ:
export function aylikToplamiHesapla() {
    const toplamAlani = document.getElementById('profilToplamAlani');
    if (!toplamAlani) return; 

    let tumKayitlar = JSON.parse(localStorage.getItem('yemekKayitlari')) || {};
    let profilToplamlari = {};

    const seciliYil = suAnkiTarih.getFullYear();
    const seciliAy = String(suAnkiTarih.getMonth() + 1).padStart(2, '0');
    const arananAyKodu = `${seciliYil}-${seciliAy}`; 

    for (let tarih in tumKayitlar) {
      if (tarih.startsWith(arananAyKodu)) {
        tumKayitlar[tarih].forEach(kayit => {
          const profilAdi = kayit.profil;
          if (!profilToplamlari[profilAdi]) profilToplamlari[profilAdi] = 0;

          kayit.yemekler.forEach(yemek => {
            if (yemek.fiyat) profilToplamlari[profilAdi] += parseInt(yemek.fiyat, 10);
          });
        });
      }
    }

    let htmlIcerik = `<h2 style="text-align:center; color:#ffcc00; font-family:'Rajdhani', sans-serif; margin-top:0; margin-bottom: 20px; letter-spacing: 1px;">${aylar[suAnkiTarih.getMonth()]} Ayı Toplam Harcamaları</h2>`;

    const profiller = Object.keys(profilToplamlari);
    if (profiller.length > 0) {
      profiller.forEach(profil => {
        htmlIcerik += `
          <div class="profil-aylik-kart">
            <span class="profil-aylik-isim">👤 ${profil}</span>
            <span class="profil-aylik-tutar">${profilToplamlari[profil]}₺</span>
          </div>
        `;
      });
    } else {
      htmlIcerik += `<p style="text-align:center; font-family: Story Script; opacity:0.7; font-size: 18px;">Bu ay için henüz bir harcama bulunmuyor.</p>`;
    }
    
    toplamAlani.innerHTML = htmlIcerik;
}

export function takvimiOlustur() {
    const gunlerKutusu = document.getElementById('takvim-gunleri');
    const baslik = document.getElementById('ay-yil-baslik');
    if(!gunlerKutusu) return; 
    
    gunlerKutusu.innerHTML = "";
    const yil = suAnkiTarih.getFullYear();
    const ay = suAnkiTarih.getMonth();
    
    baslik.innerText = `${aylar[ay]} ${yil}`;
    
    let ilkGun = new Date(yil, ay, 1).getDay();
    ilkGun = ilkGun === 0 ? 6 : ilkGun - 1;
    
    const ayinGunSayisi = new Date(yil, ay + 1, 0).getDate();
    const bugun = new Date();

    for (let i = 0; i < ilkGun; i++) {
      const bosKutu = document.createElement('div');
      bosKutu.classList.add('bos-kutu');
      gunlerKutusu.appendChild(bosKutu);
    }
    
    let tumKayitlar = JSON.parse(localStorage.getItem('yemekKayitlari')) || {};

    for (let i = 1; i <= ayinGunSayisi; i++) {
      const gunKutusu = document.createElement('div');
      const geceYarisiBugun = new Date();
      geceYarisiBugun.setHours(0, 0, 0, 0);
      const hucreTarihi = new Date(yil, ay, i);

      if (hucreTarihi > geceYarisiBugun) {
          gunKutusu.classList.add('gelecek-gun');
      }
      if (i === bugun.getDate() && ay === bugun.getMonth() && yil === bugun.getFullYear()) {
        gunKutusu.classList.add('bugun');
      }
      
      const ayFormatli = String(ay + 1).padStart(2, '0');
      const gunFormatli = String(i).padStart(2, '0');
      const tamTarih = `${yil}-${ayFormatli}-${gunFormatli}`;
      gunKutusu.setAttribute('data-tarih', tamTarih); 
      
      const gunNumarasi = document.createElement('span');
      gunNumarasi.classList.add('gun-numarasi');
      gunNumarasi.innerText = i;

      const notAlani = document.createElement('div');
      notAlani.classList.add('gun-notu');
      notAlani.style.display = "flex";
      notAlani.style.flexDirection = "column";
      notAlani.style.marginTop = "8px";
      
      if (tumKayitlar[tamTarih] && tumKayitlar[tamTarih].length > 0) {
         gunKutusu.style.borderBottom = "4px solid rgb(20, 170, 20)"; 
         const siparisVerenler = [...new Set(tumKayitlar[tamTarih].map(kayit => kayit.profil))];

         const profilEtiketi = document.createElement('div');
         profilEtiketi.innerHTML = siparisVerenler.map(isim => ` ${isim}`).join('<br>');
         profilEtiketi.style.backgroundColor = "rgba(255, 204, 0, 0.15)";
         profilEtiketi.style.color = "#ffcc00";
         profilEtiketi.style.fontSize = "12px"; 
         profilEtiketi.style.padding = "4px 8px";
         profilEtiketi.style.borderRadius = "4px";
         profilEtiketi.style.fontWeight = "bold";
         profilEtiketi.style.lineHeight = "1.6"; 
         profilEtiketi.style.textAlign = "left"; 

         notAlani.appendChild(profilEtiketi);
      }
      
      gunKutusu.appendChild(gunNumarasi);
      gunKutusu.appendChild(notAlani);
      gunlerKutusu.appendChild(gunKutusu);
    }

    aylikToplamiHesapla();
}