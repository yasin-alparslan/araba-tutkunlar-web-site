# Araba Tutkunları - Güncelleme Notları

Bu sürümde site genelinde premium ve daha işlevsel bir yapı hedeflendi.

## Öne çıkan değişiklikler

- Ana sayfa daha sade, etkileyici ve yönlendirici hale getirildi.
- Modifiye Stüdyosu geliştirildi:
  - Hazır paketler: Günlük Kullanım, Pist, Show Car
  - İşçilik dahil/hariç seçeneği
  - Tahmini güç ve tork artışı
  - Sürüş yüksekliği göstergesi
  - Yapılandırmayı tarayıcıya kaydetme
  - Yazdırılabilir özet
- Haberler sayfası geliştirildi:
  - Kategori filtreleri
  - Haber arama
  - Öne çıkan haber alanı
  - Detay aç/kapat alanı
- İncelemeler sayfası yenilendi:
  - Puanlama
  - Artılar / eksiler
  - Teknik özetler
- Karşılaştırmalar sayfası daha görsel tablo yapısına çevrildi.
- Giriş ve kayıt ekranları iyileştirildi:
  - Şifre göster/gizle
  - Daha açıklayıcı hata mesajları
  - Beni hatırla seçeneği
- Admin panel geliştirildi:
  - Haber yönetimi
  - İnceleme yönetimi
  - Modifiye fiyat yönetimi taslağı
  - Kullanıcı arama
  - Yorum yönetimi taslağı
  - Site ayarları taslağı
- SEO için metadata, robots.txt ve sitemap eklendi.
- `.env.example` eklendi.

## Not

Giriş, kayıt ve admin paneli için proje ana klasöründe `.env.local` dosyası oluşturulmalıdır.


## Kullanıcı/Admin Erişim Güncellemesi
- Admin panel erişimi artık role göre kısıtlanmaz.
- Giriş yapan her kullanıcı `/admin` sayfasına erişebilir.
- Üst menüde giriş yapan kullanıcılar için doğrudan `Admin Paneli` bağlantısı gösterilir.
- Giriş sonrası kullanıcılar otomatik olarak admin paneline yönlendirilir.
