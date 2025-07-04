# 🌊 Save Our Oceans Initiative

<div align="center">

![Ocean Cleanup](./screenshot.png)

**Blockchain-powered ocean cleanup fundraising platform on Stacks**

[![Stacks](https://img.shields.io/badge/Built%20on-Stacks-orange)](https://stacks.co)
[![Next.js](https://img.shields.io/badge/Frontend-Next.js%2015-black)](https://nextjs.org)
[![Clarity](https://img.shields.io/badge/Smart%20Contracts-Clarity-blue)](https://clarity-lang.org)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-blue)](https://typescriptlang.org)

</div>

## 🎯 Proje Hakkında

Save Our Oceans Initiative, blockchain teknolojisi kullanarak okyanuslarımızı temizleme misyonunu destekleyen merkezi olmayan bir bağış toplama platformudur. Bu proje, Stacks blockchain üzerinde Clarity smart contract'ları kullanarak şeffaf ve güvenli bağış süreçleri sağlar.

### 🌟 Temel Özellikler

- **🔒 Blockchain Güvenliği**: Stacks blockchain üzerinde Clarity smart contract'ları
- **🌊 Okyanus Teması**: Tamamen denizcilik temalı kullanıcı arayüzü
- **📊 Gerçek Zamanlı İzleme**: Temizlik ilerlemesi ve deniz yaşamı koruma takibi
- **🗺️ İnteraktif Harita**: Küresel temizlik operasyonlarının görselleştirilmesi
- **💰 Milestone Tabanlı Fonlama**: Hedef bazlı bağış kilidinin açılması
- **📱 Responsive Tasarım**: Mobil-öncelikli ocean temalı arayüz
- **🔄 Real-time Updates**: Anlık bağış ve ilerleme güncellemeleri

### 📊 Ocean Dashboard Bileşenleri

- **🗺️ Cleanup Map**: Küresel temizlik lokasyonlarının interaktif haritası
- **🐠 Marine Life Counter**: Korunan tür sayısı ve animasyonlu sayaçlar
- **📸 Photo Gallery**: Önce/sonra karşılaştırmalı galeri
- **📊 Pollution Tracker**: Tip bazında plastik temizleme istatistikleri

## 🎯 Fonlama Hedefleri

| Milestone | Tutar | Amaç |
|-----------|-------|------|
| **25%** | $12,500 STX | Temizlik Ekipmanları & İlk Operasyonlar |
| **50%** | $25,000 STX | Gelişmiş Teknoloji Dağıtımı |
| **75%** | $37,500 STX | Deniz Yaşamı Koruma Programları |
| **100%** | $50,000 STX | Tam Kapsamlı Operasyonlar & Toplum Genişlemesi |

*Bu eğitim amaçlı örnek bir uygulamadır. Sağlanan smart contract'lar audit edilmemiştir.*

## 🚀 Development

Ocean cleanup platformunu Stacks Devnet (özel geliştirme blockchain ortamı) ile çalıştırmak için şu adımları izleyin:

### 🔧 Ön Gereksinimler

- **Node.js** v18+ 
- **npm** veya **yarn**
- **Clarinet** (Clarity development)
- **Hiro Wallet** (test için)

### 1. **Hiro Platform'da Devnet Başlatma**

   - [Hiro Platform](https://platform.hiro.so)'a giriş yapın
   - Projenize gidin ve Devnet'i başlatın (deployment plan güncellemesi önerisi gelirse, proje önceden yapılandırılmış olduğu için güncellemeyin)
   - API anahtarınızı kopyalayın:
     - Devnet Stacks API URL'sinden: `https://api.platform.hiro.so/v1/ext/<YOUR-API-KEY>/stacks-blockchain-api`
     - Veya https://platform.hiro.so/settings/api-keys adresinden

### 2. **Yerel Ortam Konfigürasyonu**

**Backend bağımlılıklarını kurun:**
```bash
cd clarity
npm install
```

**Frontend bağımlılıklarını kurun:**
```bash
cd ../front-end
npm install
```


**Environment dosyası oluşturun:**
```bash
cp front-end/.env.example front-end/.env
```

**Hiro Platform API anahtarınızı `front-end/.env` dosyasına ekleyin:**
```bash
NEXT_PUBLIC_PLATFORM_HIRO_API_KEY=your-api-key-here
```

### 3. **Ocean Cleanup Uygulamasını Başlatma**

**Smart contract'ları test edin:**
```bash
cd clarity
npm test
```

**Next.js uygulamasını front-end dizininden başlatın:**
```bash
cd ../front-end
npm run dev
```

**Tarayıcıda görüntüleyin:** `http://localhost:3000` adresine giderek ocean cleanup platformu ile etkileşim kurun. Devnet çalışıyorsa, test cüzdanlarınız zaten fonlanmış ve test için bağlanmış olacaktır.

## 🎨 Ocean Teması Özelleştirmesi

Ocean cleanup kampanyanızı özelleştirmek için şu dosyaları düzenleyin:

### 🌊 Renk Paleti & Tema
- **Ocean Blue**: `#0077BE` - Ana mavi ton
- **Seafoam Green**: `#20B2AA` - Deniz köpüğü yeşili  
- **Coral**: `#FF7F50` - Mercan turuncu
- **Deep Sea**: `#003366` - Derin deniz mavisi

### 📁 Özelleştirilebilir Dosyalar

- **`front-end/src/constants/campaign.ts`** - Kampanya başlığı ve alt başlık
- **`front-end/public/campaign-details.md`** - Kampanya açıklama içeriği
- **`front-end/public/campaign/`** - Ocean cleanup operasyon görselleri
- **`front-end/src/theme.ts`** - Ocean teması renk konfigürasyonu
- **`front-end/src/app/globals.css`** - Dalga animasyonları ve ocean efektleri

### 🏗️ Proje Yapısı

```
wave-of-change/
├── clarity/                    # Smart contract'lar
│   ├── contracts/
│   │   └── fundraising.clar   # Ana fonlama contract'ı
│   ├── tests/
│   │   └── fundraising.test.ts # Contract testleri
│   └── deployments/           # Deployment konfigürasyonları
├── front-end/                 # Next.js frontend
│   ├── src/
│   │   ├── components/        # React bileşenleri
│   │   │   ├── CleanupMap.tsx      # İnteraktif temizlik haritası
│   │   │   ├── MarineLifeCounter.tsx # Deniz yaşamı sayacı
│   │   │   ├── PhotoGallery.tsx     # Önce/sonra galerisi
│   │   │   ├── PollutionTracker.tsx # Kirlilik takip sistemi
│   │   │   └── CampaignDetails.tsx  # Ana kampanya arayüzü
│   │   ├── hooks/            # Custom React hooks
│   │   ├── lib/              # Utility fonksiyonları
│   │   └── theme.ts          # Ocean teması konfigürasyonu
│   └── public/
│       ├── campaign-details.md     # Kampanya açıklaması
│       └── campaign/              # Ocean cleanup görselleri
└── README.md
```

Verilen Devnet deployment planı (`clarity/deployments/default.devnet-plan.yaml`) belirli bir fonlama hedefi ile kampanyayı başlatmak için adımlar içerir. Bu planı istediğiniz gibi özelleştirebilirsiniz.

Testnet veya Mainnet'e deploy etmeye hazır olduğunuzda, testnet/mainnet deployment planlarınıza benzer adımlar eklemeyi seçebilir veya `fundraising.initialize-campaign` fonksiyonunu on-chain manuel olarak çağırarak kampanyanızı başlatabilirsiniz.

## 🔗 Smart Contract'lar Hakkında

Bu uygulama, fon toplama işlemlerini yöneten Clarity smart contract'ı kullanır.

### `fundraising.clar`

- Contract owner'ın kampanyayı USD cinsinden fonlama hedefi ile başlatmasına izin verir
- STX veya sBTC cinsinden bağışları kabul eder
- Bireysel katkıları takip eder
- Hedef tutarına ulaşılırsa, yararlanıcının (contract owner) toplanan fonları çekmesine izin verir
- Yararlanıcının herhangi bir noktada kampanyayı iptal etmesine ve katkıları bağışçılara iade etmesine izin verir

### 🌊 Ocean-Themed Features

#### Smart Contract Özellikleri
```clarity
;; Ana fonksiyonlar
(define-public (donate (amount uint)))
(define-public (withdraw-funds (amount uint)))
(define-read-only (get-campaign-info))
(define-read-only (get-donation-info (donor principal)))
```

#### Ocean Dashboard Components
- **🗺️ CleanupMap**: 5 okyanus bölgesinde gerçek zamanlı temizlik ilerlemesi
- **🐠 MarineLifeCounter**: 15 korunan deniz türü sayacı
- **📸 PhotoGallery**: Swipeable önce/sonra galeri
- **📊 PollutionTracker**: Plastik türü bazında temizlik istatistikleri

## 🧪 Devnet ile Test Etme

Hiro Platform'un Devnet'i, dApp'lerinizi testnet veya mainnet'e deploy etmeden önce test etmek için sandbox edilmiş, kişisel blockchain ortamıdır. Her yeni Devnet başlattığınızda, blockchain durumu sıfırlanır ve proje contract'larınız sıfırdan deploy edilir.

Bu özellik yararlıdır çünkü blockchain'e deploymentlar kalıcıdır ve geri alınamaz. Contract'larınızı Testnet veya Mainnet'e yükseltmeden önce Devnet'te kapsamlı bir şekilde test ettiğinizden emin olun.

Contract'ınızda değişiklik yaparsanız, contract değişikliklerinin Devnet'te görünmesi için değişikliklerinizi push etmeniz ve Devnet'i yeniden başlatmanız gerekir.

### 1. Devnet Başlatma ve Contract Deploy Etme

1. Projenizi Hiro Platform'da açın
2. Test ortamınızı başlatmak için "Start Devnet"e tıklayın (contract'lar deployment planınıza göre otomatik olarak deploy edilecektir)
3. Contract'larınızın Devnet dashboard'unda en geç 45. blokta deploy edildiğini görmelisiniz

### 2. Smart Contract Fonksiyonlarını Test Etme

Smart contract fonksiyonları doğrudan Platform dashboard'unuzdan test edilebilir.

1. Contract'larınızın deploy edildiğini ve Devnet'in çalıştığını onaylamak için Devnet sekmesini seçin
2. "Interact with Devnet"e ve ardından "Call functions"a tıklayın
3. Dropdown menülerden contract'ınızı ve test etmek istediğiniz fonksiyonu seçin
4. Çağırıcı olarak önceden fonlanmış devnet cüzdanlarından birini ve (gerekirse) alıcı olarak başka birini kullanın
5. Fonksiyonu çalıştırmak için "Call function"a tıklayın; fonksiyon logic'i ve çağırıcının izinlerine bağlı olarak başarılı olacak veya başarısız olacaktır
6. Fonksiyon submit edildikten sonra, transaction'ın Devnet dashboard'unda on-chain çözülmesini izleyebilir ve fonksiyonun beklendiği gibi çalıştığını onaylayabilirsiniz

Contract'larda yapılan herhangi bir değişikliğin Devnet'i yeniden başlatmayı ve contract'ları yeniden deploy etmeyi gerektirdiğini unutmayın.

### 3. Ocean Cleanup Entegrasyon Testi

Devnet çalışırken, front-end fonksiyonalitelerinizi test edebilir ve ocean cleanup fonksiyonlarını test ettiğiniz şekilde çalıştığını doğrulayabilirsiniz.

1. Platform dashboard'unda Devnet'inizin çalıştığını ve front-end dizininde `npm run dev`'in çalıştığını onaylayın
2. Ocean cleanup uygulamasını görüntülemek ve etkileşim kurmak için [http://localhost:3000](http://localhost:3000) adresine gidin
3. Önceden fonlanmış cüzdanları kullanarak bağış, iade ve çekme fonksiyonalitelerini test edin. Farklı test cüzdanları arasında seçim yapmak için sağ üst köşedeki cüzdan seçiciyi kullanın
4. Transaction'lar submit edilip on-chain çözülürken bunları görüntülemek için Platform'daki Devnet dashboard'una gidin

Front-end değişikliklerinizi test etmek için Devnet'i yeniden başlatmanıza gerek yoktur.

## 🚀 Sonraki Adımlar

Ocean cleanup dApp'inizi Devnet'te kapsamlı bir şekilde test ettikten ve fonksiyonalitesinden emin olduktan sonra, Mainnet'te başlatmadan önce Stacks Testnet'te test etmeye geçebilirsiniz.

### 🧪 Testnet'e Geçiş

1. Test STX token'ları almak için [Stacks Testnet Faucet](https://explorer.hiro.so/sandbox/faucet?chain=testnet) kullanın
2. `.env` dosyanızdaki environment değişkenlerini güncelleyerek `NEXT_PUBLIC_CONTRACT_DEPLOYER_TESTNET_ADDRESS` ve `NEXT_PUBLIC_CONTRACT_DEPLOYER_MAINNET_ADDRESS` için değerler ekleyin. Contract'ı deploy etmeyi planladığınız STX cüzdan adresini ekleyin.
3. Platform dashboard ve deployment planınızı kullanarak contract'larınızı Testnet'e deploy edin
4. Gerçek ağ koşulları ve transaction süreleri ile uygulamanızı test edin
5. [Testnet Explorer](https://explorer.hiro.so/?chain=testnet)'da contract etkileşimlerinizi doğrulayın

### 🌊 Mainnet'te Ocean Cleanup Lansmanı

Ocean cleanup uygulamanızı başlatmaya hazır olduğunuzda:

1. Deployment ve transaction maliyetleri için gerçek STX token'larınız olduğundan emin olun
2. Deployment konfigürasyonunuzu Mainnet'i hedefleyecek şekilde güncelleyin
3. Contract'larınızı Platform dashboard aracılığıyla deploy edin
4. Frontend environment değişkenlerinizi Mainnet'i işaret edecek şekilde güncelleyin
5. Ocean cleanup uygulamanızı başlatın ve gerçek transaction'ları işlemeye başlayın!

**Hatırlatma:** Mainnet deployment'ları kalıcıdır ve gerçek cryptocurrency transaction'larını içerir. Mainnet'e deploy etmeden önce tüm contract kodunu ve frontend entegrasyonlarını iki kez kontrol edin.

## 🌊 Impact Metrics & Goals

### Hedeflenen Ocean Impact
- **2.5M pound** plastik atık temizleme
- **15 deniz türü** koruma programı
- **500 mil** kıyı şeridi rehabilitasyonu
- **50K kişi** toplum katılımı ve bilinçlendirme

### Teknoloji Stack

| Kategori | Teknoloji |
|----------|-----------|
| **Blockchain** | Stacks, Clarity Smart Contracts |
| **Frontend** | Next.js 15, React 18, TypeScript |
| **UI/UX** | Chakra UI, Ocean Custom Theme |
| **Styling** | CSS Animations, Wave Effects |
| **Testing** | Vitest, React Testing Library |
| **Deployment** | Hiro Platform, Vercel |

---

<div align="center">

**🌊 Join the Wave of Change - Save Our Oceans! 🌊**

*Birlikte, blockchain teknolojisi aracılığıyla okyanus kirliliğine karşı gelgiti çevirebiliriz.*

**Proje İstatistikleri:**
- 🎯 **Fonlama Hedefi**: $50,000 STX
- ⏱️ **Süre**: 90 gün
- 🌍 **Küresel Etki**: Çoklu okyanus bölgeleri
- 💻 **Teknoloji**: Stacks Blockchain + Next.js
- 🔒 **Güvenlik**: Clarity Smart Contracts
- 📱 **Mobil-First**: Responsive ocean teması

</div>
