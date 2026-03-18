document.addEventListener('DOMContentLoaded', function() {
  
  /*=========== will be imported from another file*=========== */
  const yemekVeritabani = {
    corba: [
      { isim: "Mercimek Çorbası", image: "assets/mercimek.jpg", fiyat: 70 },
      { isim: "Ezogelin Çorbası", image: "assets/ezogelin.jpg", fiyat: 80 },
      { isim: "Tavuk Suyu Çorbası", image: "assets/tavuk-suyu.jpeg", fiyat: 95 },
      
    ],
    anaYemek: [
      { isim: "Fırın Tavuk", image: "assets/firintavuk.jpg", fiyat: 230 },
      { isim: "Kuru Fasulye", image: "assets/kurufasulye.jpg", fiyat: 170 },
      { isim: "Salçalı Köfte", image: "assets/salcalikofte.jpg", fiyat: 250 },
      { isim: "Patlıcan Musakka", image: "assets/patlicanmusakka.jpg", fiyat: 260 },
      { isim: "Çıtır Tavuk", image: "assets/citirtavuk.jpg", fiyat: 240 },
      { isim: "Hasanpaşa Köfte", image: "assets/hasanpasa.jpg", fiyat: 270 },
      { isim: "Terbiyeli Köfte", image: "assets/terbiyelikofte.jpg", fiyat: 220 },
      { isim: "Kıymalı Çökertme Kebabı", image: "assets/kıymalıcokertme.jpg", fiyat: 250 },
      { isim: "Sebzeli Kıymalı Patlıcan Yemeği", image: "assets/sebzelikiymalipatlican.jpg", fiyat: 230 },
      { isim: "Nohut", image: "assets/nohut.jpg", fiyat: 180 },
      { isim: "Sebzeli Tavuk", image: "assets/sebzelitavuk.jpg", fiyat: 220 },
      { isim: "Beşamel Soslu Kıymalı Patates", image: "assets/besamelsoslukiymali.jpg", fiyat: 240 },
      { isim: "Beşamel Soslu Tavuk", image: "assets/besamelsoslutavuk.jpg", fiyat: 210 },
      { isim: "Karnıyarık", image: "assets/karnıyarık.jpg", fiyat: 250 },
      { isim: "Kıymalı Ekmek Kebabı", image: "assets/kıymalıekmekkebabı.jpg", fiyat: 240 },
      { isim: "Patates Oturtma", image: "assets/patatesoturtma.jpg", fiyat: 220 },
      { isim: "Tavuk Tandık", image: "assets/tavuktandır.jpg", fiyat: 260 },
    ],
    eslikci:[
        { isim: "Pirinç Pilavı", image: "assets/pirincpilavi.jpg", fiyat: 110},
        { isim: "Soslu Mantı", image: "assets/soslumanti.jpg", fiyat: 150},
        { isim: "Bulgur Pilavı", image: "assets/bulgurpilavi.jpg", fiyat: 100},
        { isim: "Soslu Spagetti", image: "assets/sosluspagetti.jpg", fiyat: 130},
        { isim: "Soslu Makarna", image: "assets/soslumakarna.jpg", fiyat: 120},
    ],
    soguk: [
      { isim: "Çoban Salata", image: "assets/coban-salata.jpg", fiyat: 60 },
      { isim: "Mevsim Salata", image: "assets/mevsim-salata.jpg", fiyat: 50 },
      { isim: "Yoğurt", image: "assets/yogurt.jpg", fiyat: 50 },
      { isim: "Cacık", image:"assets/cacık.jpg", fiyat: 80}
      
    ],
    tatli: [
      { isim: "Tiramisu", image: "assets/tiramisu.jpg", fiyat: 140 },
      { isim: "Kemalpaşa Tatlısı", image: "assets/kemalpasa.jpg", fiyat: 120 },
      { isim: "Süt Helvası", image: "assets/suthelvasi.jpg", fiyat: 150 },
      { isim: "Çikolata Soslu Etimek", image: "assets/cikolatasosluetimek.jpg", fiyat: 100 },
      { isim: "İrmik Helvası", image: "assets/irmikhelvasi.jpg", fiyat: 110 },
      { isim: "Bisküvili Pasta", image: "assets/biskuvipasta.jpg", fiyat: 100 },
      { isim: "Portakallı Revani", image: "assets/portakallirevani.jpg", fiyat: 120 },
      { isim: "Yer Fıstıklı Çıtır Muhallebi", image: "assets/fistiklimuhallebi.jpg", fiyat: 140 },
      { isim: "Supangle", image: "assets/supangle.jpg", fiyat: 130 }
    ]
  };

  const tarihGirdisi = document.getElementById('tarih');
  const profilKartlari = document.querySelectorAll('.profile div'); //profile altındaki isimleri tek tek almak için profile div kullandık.
  const onayFooter = document.querySelector('.onayla'); //onayla classını onayFooter değişkenine koyuyo.
  const menuAlani = document.getElementById('dinamik-menu-alani');
// const bugun = new Date();
// const yil = bugun.getFullYear();
// // Aylar 0'dan (Ocak) başladığı için +1 yapıyoruz. 
// // padStart(2, '0') ile de tek haneli ayların/günlerin başına 0 ekliyoruz (Örn: 3 -> 03)
// const ay = String(bugun.getMonth() + 1).padStart(2, '0'); 
// const gun = String(bugun.getDate()).padStart(2, '0');

// // Formatı tam olarak YYYY-AA-GG şeklinde birleştirip takvime varsayılan değer olarak atıyoruz
// tarihGirdisi.value = `${yil}-${ay}-${gun}`;
// tarihGirdisi.dispatchEvent(new Event('change'));

/*=========== will be imported from another file*=========== */
  function rastgeleSec(dizi, adet) {
    const kopya = [...dizi]; 
    console.log("deger:", kopya);
    
    kopya.sort(() => 0.5 - Math.random());
    return kopya.slice(0, adet);
  }

  if (tarihGirdisi) {
    
    tarihGirdisi.addEventListener('click', function() {
      if (typeof this.showPicker === 'function') this.showPicker();
    });

    tarihGirdisi.addEventListener('change', function() {
      const secilenGun = this.value;
      if (!secilenGun) return;

      let uretilenMenuler = JSON.parse(localStorage.getItem('uretilenGunlukMenuler')) || {};

      if (!uretilenMenuler[secilenGun]) {
        uretilenMenuler[secilenGun] = {
          corba: rastgeleSec(yemekVeritabani.corba, 2),
          anaYemek: rastgeleSec(yemekVeritabani.anaYemek, 3),
          eslikci: rastgeleSec(yemekVeritabani.eslikci,2),
          soguk: rastgeleSec(yemekVeritabani.soguk, 2),
          tatli: rastgeleSec(yemekVeritabani.tatli, 2)
        };
        localStorage.setItem('uretilenGunlukMenuler', JSON.stringify(uretilenMenuler));
      }

      const gununMenusu = uretilenMenuler[secilenGun];
      
      menuAlani.innerHTML = `
        <div class="kategori-bolumu">
          <h2>ÇORBA</h2>
          <div class="list">
            ${gununMenusu.corba.map((y, index) => `
              <div class="corba" data-fiyat="${y.fiyat}" style="animation-delay: ${index * 0.1}s">
                <img src="${y.image}">
                <p>${y.isim}</p>
                <p class="ucret">${y.fiyat}₺</p>
              </div>`).join('')}
          </div>
        </div>
        
        <div class="kategori-bolumu">
          <h2>ANA YEMEK</h2>
          <div class="list">
            ${gununMenusu.anaYemek.map((y, index) => `
              <div class="yemek" data-fiyat="${y.fiyat}" style="animation-delay: ${index * 0.1}s">
                <img src="${y.image}">
                <p>${y.isim}</p>
                <p class="ucret">${y.fiyat}₺</p>
              </div>`).join('')}
          </div>
        </div>

        <div class="kategori-bolumu">
          <h2>EŞLİKÇİ</h2>
          <div class="list">
            ${gununMenusu.eslikci.map((y, index) => `
              <div class="yemek" data-fiyat="${y.fiyat}" style="animation-delay: ${index * 0.1}s">
                <img src="${y.image}">
                <p>${y.isim}</p>
                <p class="ucret">${y.fiyat}₺</p>
              </div>`).join('')}
          </div>
        </div>

        <div class="kategori-bolumu">
          <h2>SOĞUK</h2>
          <div class="list">
            ${gununMenusu.soguk.map((y, index) => `
              <div class="soguk" data-fiyat="${y.fiyat}" style="animation-delay: ${index * 0.1}s">
                <img src="${y.image}">
                <p>${y.isim}</p>
                <p class="ucret">${y.fiyat}₺</p>
              </div>`).join('')}
          </div>
        </div>

        <div class="kategori-bolumu">
          <h2>TATLI</h2>
          <div class="list">
            ${gununMenusu.tatli.map((y, index) => `
              <div class="tatlı" data-fiyat="${y.fiyat}" style="animation-delay: ${index * 0.1}s">
                <img src="${y.image}">
                <p>${y.isim}</p>
                <p class="ucret">${y.fiyat}₺</p>
              </div>`).join('')}
          </div>
        </div>
      `;
      
      profilKartlari.forEach(k => k.classList.remove('secili'));
      if(onayFooter) onayFooter.classList.remove('active');
    });

    profilKartlari.forEach(kart => {
    kart.addEventListener('click', function() {
    if (tarihGirdisi.value === "") {
      alert("Lütfen profil seçmeden önce bir tarih belirleyin.");
      return; 
    }

    // 1. Tıklanan kartın anlık durumunu kontrol et (Boolean: true/false döner)
    const seciliMi = this.classList.contains('secili');

    // 2. DOM üzerindeki tüm kartlardan 'secili' sınıfını temizle (Reset)
    profilKartlari.forEach(k => k.classList.remove('secili'));

    // 3. Eğer kart tıklanmadan önce seçili DEĞİL idiyse, şimdi seç.
    // Eğer zaten seçiliyse işlem yapma (yukarıdaki reset işlemi zaten sınıfı kaldırdı).
    if (!seciliMi) {
      this.classList.add('secili');
    }
  });
});

    if (menuAlani) {
      menuAlani.addEventListener('click', function(e) {
        const kart = e.target.closest('.list > div');
        
        if (kart) {
          const liste = kart.parentElement;
          if (kart.classList.contains('secili-yemek')) {
            kart.classList.remove('secili-yemek');
          } else {
            liste.querySelectorAll('.secili-yemek').forEach(k => k.classList.remove('secili-yemek'));
            kart.classList.add('secili-yemek');
          }

          if (onayFooter) {
            const seciliKartVarMi = document.querySelectorAll('.secili-yemek').length > 0;
            if (seciliKartVarMi) onayFooter.classList.add('active');
            else onayFooter.classList.remove('active');
          }
        }
      });
    }

    if (onayFooter) {
      onayFooter.addEventListener('click', function() {
        const seciliProfil = document.querySelector('.profile div.secili');
        if (!seciliProfil) {
          alert("Lütfen menüleri kaydetmeden önce yukarıdan bir profil seçin!");
          return;
        }
        const profilAdi = seciliProfil.querySelector('p').innerText;

        const seciliYemekKutulari = document.querySelectorAll('.secili-yemek');
        let secilenYemekler = [];
        
        seciliYemekKutulari.forEach(kutu => {
          const yemekAdi = kutu.querySelector('p:not(.ucret)').innerText;
          const yemekFiyati = kutu.getAttribute('data-fiyat'); 

          secilenYemekler.push({ isim: yemekAdi, fiyat: yemekFiyati });
        });

        const secilenTarih = tarihGirdisi.value; 
        let tumKayitlar = JSON.parse(localStorage.getItem('yemekKayitlari')) || {};
        
        if (!tumKayitlar[secilenTarih]) {
          tumKayitlar[secilenTarih] = [];
        }
        
        // O güne ait kayıtlarda, aynı isimli profil varsa onu filtreden geçirip siliyoruz!
        tumKayitlar[secilenTarih] = tumKayitlar[secilenTarih].filter(kayit => kayit.profil !== profilAdi);
        
        // Şimdi eskisini sildiğimiz veya hiç olmayan o taze kaydı listeye ekliyoruz:
        tumKayitlar[secilenTarih].push({
          profil: profilAdi,
          yemekler: secilenYemekler
        });
        
        localStorage.setItem('yemekKayitlari', JSON.stringify(tumKayitlar));
        alert(`Şahane! Seçimleriniz ${secilenTarih} tarihi için ${profilAdi} profiline kaydedildi.`);
        
        window.scrollTo ({
            top: 0,
            behavior: "smooth"
        });
        
        onayFooter.classList.remove('active');
        seciliYemekKutulari.forEach(k => k.classList.remove('secili-yemek'));
        profilKartlari.forEach(k => k.classList.remove('secili'));
      });
    }
  }

/*=========== will be imported from another file*=========== */
  function aylikToplamiHesapla() {
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

    const aylarIsimleri = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
    let htmlIcerik = `<h2 style="text-align:center; color:#ffcc00; font-family:'Rajdhani', sans-serif; margin-top:0; margin-bottom: 20px; letter-spacing: 1px;">${aylarIsimleri[suAnkiTarih.getMonth()]} Ayı Toplam Harcamaları</h2>`;

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

  // =========================================================
  // 2. MOTOR: TAKVİM OLUŞTURMA (HTML'İ ÇİZME)
  // =========================================================
  const gunlerKutusu = document.getElementById('takvim-gunleri');
  const baslik = document.getElementById('ay-yil-baslik');
  const oncekiBtn = document.getElementById('onceki-ay');
  const sonrakiBtn = document.getElementById('sonraki-ay');

  let suAnkiTarih = new Date();
  const aylar = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];

  /*=========== will be imported from another file*=========== */
  function takvimiOlustur() {
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

      // Profillerin isimlerini yazacağımız not alanı
      const notAlani = document.createElement('div');
      notAlani.classList.add('gun-notu');
      notAlani.style.display = "flex";
      notAlani.style.flexDirection = "column";
      notAlani.style.marginTop = "8px";
      
      if (tumKayitlar[tamTarih] && tumKayitlar[tamTarih].length > 0) {
         gunKutusu.style.borderBottom = "4px solid rgb(20, 170, 20)"; 

         // O gün sipariş veren farklı isimleri bul
         const siparisVerenler = [...new Set(tumKayitlar[tamTarih].map(kayit => kayit.profil))];

         const profilEtiketi = document.createElement('div');
         
         // YENİ: İsimleri ".map" ile dönüp her birinin başına ikon koyuyoruz ve ".join('<br>')" ile alt alta indiriyoruz
         profilEtiketi.innerHTML = siparisVerenler.map(isim => ` ${isim}`).join('<br>');
         
         // Tek bir kutu ama içi liste gibi davranıyor
         profilEtiketi.style.backgroundColor = "rgba(255, 204, 0, 0.15)";
         profilEtiketi.style.color = "#ffcc00";
         profilEtiketi.style.fontSize = "12px"; // Takvimi taşırmasın diye ufak tutuldu
         profilEtiketi.style.padding = "4px 8px";
         profilEtiketi.style.borderRadius = "4px";
         profilEtiketi.style.fontWeight = "bold";
         profilEtiketi.style.lineHeight = "1.6"; // İsimler birbirine yapışmasın diye satır arası boşluğu
         profilEtiketi.style.textAlign = "left"; // Alt alta yazılınca soldan hizalı daha profesyonel durur

         notAlani.appendChild(profilEtiketi);
      }
      
      gunKutusu.appendChild(gunNumarasi);
      gunKutusu.appendChild(notAlani);
      gunlerKutusu.appendChild(gunKutusu);
    }

    aylikToplamiHesapla();
  }

  if(oncekiBtn && sonrakiBtn) {
    oncekiBtn.addEventListener('click', () => { suAnkiTarih.setMonth(suAnkiTarih.getMonth() - 1); takvimiOlustur(); });
    sonrakiBtn.addEventListener('click', () => { suAnkiTarih.setMonth(suAnkiTarih.getMonth() + 1); takvimiOlustur(); });
  }

  takvimiOlustur();

  const modal = document.getElementById('gunModali');
  const kapatBtn = document.getElementById('modalKapatBtn');
  const takvimIzgara = document.getElementById('takvim-gunleri');
  const modalIcerik = document.querySelector('.modal-icerik');
  const modalBaslik = document.getElementById('modal-baslik');

  /*=========== will be imported from another file*=========== */
  function modalIceriginiCiz(tarih, gunSayisi) {
    // 1. "2026-03-15" şeklindeki tarihi tirelerden (-) kılıçla üçe bölüyoruz.
    const parcalar = tarih.split('-'); // Elimizde şu an bir liste var: ["2026", "03", "15"]

    // 2. Yılı (ilk parça olan 0. index) alıyoruz.
    const yil = parcalar[0];

    // 3. Ayı (ortadaki parça olan 1. index) sayıya çevirip 1 çıkarıyoruz (JS ayları 0'dan saydığı için).
    const ayIndexi = parseInt(parcalar[1], 10) - 1;

    // 4. Sayfanın en üstünde tanımladığımız aylar dizisinden ismini çekiyoruz (Örn: "Mart").
    const ayIsmi = aylar[ayIndexi]; 

    // 5. Başlığa sırasıyla: Gün, Ay İsmi ve Yıl basıyoruz.
    if (modalBaslik) modalBaslik.innerText = `${gunSayisi} ${ayIsmi} ${yil}`;

    let tumKayitlar = JSON.parse(localStorage.getItem('yemekKayitlari')) || {};
    const oGununVerisi = tumKayitlar[tarih]; 

    if (oGununVerisi && oGununVerisi.length > 0) {
      let tumIcerikHTML = ""; 
      
      oGununVerisi.forEach((kayit, index) => {
        let toplamTutar = 0; 
        let yemekListesiHTML = `<ul style="font-size: 16px; line-height: 1.6; margin-bottom: 0; padding-left: 0; list-style-type: none;">`;
        
        kayit.yemekler.forEach(yemek => {
          if (typeof yemek === 'string') {
            yemekListesiHTML += `<li>- ${yemek}</li>`;
          } else {
            if (yemek.fiyat) toplamTutar += parseInt(yemek.fiyat, 10);
            
            yemekListesiHTML += `
              <li style="display: flex; justify-content: space-between; border-bottom: 1px solid rgba(255, 255, 255, 0.05); margin-bottom: 5px; padding-bottom: 5px;">
                <span>${yemek.isim}</span>
                <span style="color: #4CAF50; font-weight: bold;">${yemek.fiyat}₺</span>
              </li>`;
          }
        });
        
        yemekListesiHTML += `</ul>`;

        let toplamTutarHTML = "";
        if (toplamTutar > 0) {
          toplamTutarHTML = `
            <hr style="border: none; border-bottom: 1px dashed rgba(255, 255, 255, 0.2); margin: 10px 0;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px;">
              <span style="font-weight: bold; opacity: 0.9;">Toplam:</span>
              <span style="color: #ffcc00; font-size: 20px; font-weight: bold;">${toplamTutar}₺</span>
            </div>
          `;
        }

        tumIcerikHTML += `
          <div style="position: relative; background: rgba(255, 255, 255, 0.05); padding: 15px; border-radius: 8px; margin-bottom: 15px; border-left: 4px solid #ffcc00;">
            
            <button class="kayit-sil-btn" data-tarih="${tarih}" data-index="${index}" data-gun="${gunSayisi}" 
              style="position: absolute; top: 10px; right: 10px; background: #ff4444; border: none; color: white; width: 30px; height: 30px; border-radius: 5px; cursor: pointer; font-weight: bold; transition: 0.2s;">
              X
            </button>

            <p style="color: #ffcc00; font-size: 18px; font-weight: bold; margin: 0 0 10px 0; padding-right: 35px;">Profil: ${kayit.profil}</p>
            <p style="margin: 0; font-weight: bold; opacity: 0.9;">Seçilen Yemekler:</p>
            <hr style="border: none; border-bottom: 1px solid rgba(255, 255, 255, 0.1); margin: 8px 0 10px 0;">
            ${yemekListesiHTML}
            ${toplamTutarHTML}
          </div>
        `;
      });
      
      modalIcerik.innerHTML = tumIcerikHTML;
    } else {
      modalIcerik.innerHTML = `<p style="opacity: 0.7;">Bu güne ait herhangi bir seçim bulunmuyor.</p>`;
    }
  }

  if (takvimIzgara) {
    takvimIzgara.addEventListener('click', function(e) {
      const tiklananGunKutusu = e.target.closest('#takvim-gunleri > div');
      
      if (tiklananGunKutusu && !tiklananGunKutusu.classList.contains('bos-kutu')) {
        const oGununTarihi = tiklananGunKutusu.getAttribute('data-tarih');
        const gunSayisi = tiklananGunKutusu.querySelector('.gun-numarasi').innerText;
        
        modalIceriginiCiz(oGununTarihi, gunSayisi);

        if (modal) modal.classList.add('acik');
      }
    });
  }

  if (modalIcerik) {
    modalIcerik.addEventListener('click', function(e) {
      if (e.target.classList.contains('kayit-sil-btn')) {
        const silinecekTarih = e.target.getAttribute('data-tarih');
        const silinecekIndex = parseInt(e.target.getAttribute('data-index'));
        const oGun = e.target.getAttribute('data-gun');

        let tumKayitlar = JSON.parse(localStorage.getItem('yemekKayitlari')) || {};

        tumKayitlar[silinecekTarih].splice(silinecekIndex, 1);

        if (tumKayitlar[silinecekTarih].length === 0) {
          delete tumKayitlar[silinecekTarih];
        }

        localStorage.setItem('yemekKayitlari', JSON.stringify(tumKayitlar));
        
        modalIceriginiCiz(silinecekTarih, oGun);
        if (typeof takvimiOlustur === 'function') takvimiOlustur();
      }
    });
  }

  if (kapatBtn) kapatBtn.addEventListener('click', () => { if(modal) modal.classList.remove('acik'); });
  if (modal) modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('acik'); });

  // 1. Bugünün tarihini formatla
    const bugun = new Date();
    const yil = bugun.getFullYear();
    const ay = String(bugun.getMonth() + 1).padStart(2, '0');
    const gun = String(bugun.getDate()).padStart(2, '0');

    const formatlanmisTarih = `${yil}-${ay}-${gun}`;
    tarihGirdisi.max = formatlanmisTarih;
    tarihGirdisi.value=formatlanmisTarih;
    tarihGirdisi.dispatchEvent(new Event('change'));
});

