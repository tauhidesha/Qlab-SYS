export interface MappedServiceResult {
  serviceName: string;
  isAmbiguous: boolean; // REVISI: Dibuat wajib menjadi boolean
}

export function mapTermToOfficialService(message: string): MappedServiceResult | null {
  const msg = message.toLowerCase();

  const serviceKeywordsMap: {
    serviceName: string;
    keywords: string[];
    isAmbiguousOnKeyword?: string;  // penanda keyword default yang ambigu
  }[] = [
    {
      serviceName: 'Coating Motor Glossy',
      keywords: [
        'coating glossy', 'nano coating', 'coating kilap', 'ceramic glossy',
        'wetlook', 'kilap daun talas', 'coating', 'coating bening',
        'coating kaca', 'coating wetlook', 'coating kinclong',
        'lapis keramik glossy'
      ],
      isAmbiguousOnKeyword: 'coating', // Hanya keyword 'coating' yang dianggap ambigu
    },
    {
      serviceName: 'Coating Motor Doff',
      keywords: [
        'coating doff', 'nano doff', 'coating matte', 'matte coating',
        'keramik doff', 'coating warna doff', 'lapisan doff',
        'proteksi cat doff', 'coating tidak mengkilap', 'coating tampilan doff'
      ],
    },
    {
      serviceName: 'Complete Service Glossy',
      keywords: [
        'complete glossy', 'paket glossy', 'coating + detailing', 'glossy total',
        'paket glossy lengkap', 'servis glossy', 'detailing coating glossy',
        'glossy komplit', 'servis ultimate', 'glossy all in', 'paket sultan glossy'
      ],
    },
    {
      serviceName: 'Complete Service Doff',
      keywords: [
        'complete doff', 'paket doff', 'detailing doff', 'coating doff full',
        'paket doff lengkap', 'detailing coating doff', 'doff komplit',
        'servis doff total', 'servis ultimate doff', 'paket doff full',
        'coating + detailing doff', 'paket sultan doff', 'doff all in'
      ],
    },
    {
      serviceName: 'Repaint Bodi Halus',
      keywords: [
        'cat bodi', 'repaint halus', 'cat ulang halus', 'warna ulang',
        'repaint bodi', 'repaint alus', 'cat mulus', 'repaint kinclong',
        'cat ulang pabrikan', 'repaint full bodi', 'warna ulang bodi', 'bodi dicat ulang'
      ],
    },
    {
      serviceName: 'Repaint Bodi Kasar',
      keywords: [
        'cat dek', 'repaint kasar', 'cat hitam doff', 'cat ulang kasar',
        'cat bagian kasar', 'cat ulang dek', 'cat ulang plastik kasar',
        'cat ulang tekstur', 'dek motor kusam', 'cat ulang dek hitam', 'repaint bodi kasar'
      ],
    },
    {
      serviceName: 'Repaint Velg',
      keywords: [
        'cat velg', 'repaint velg', 'cat ulang velg', 'warna ulang velg',
        'cat pelek', 'velg dicat', 'ganti warna velg', 'velg baru lagi',
        'pelek repaint', 'warna velg keren'
      ],
    },
    {
      serviceName: 'Repaint Cover CVT / Arm',
      keywords: [
        'cat cvt', 'repaint arm', 'cat ulang arm', 'cat ulang mesin',
        'cat arm', 'repaint cvt', 'cat mesin belakang', 'cat swing arm',
        'cat ulang cvt', 'warna ulang arm', 'cover cvt repaint', 'warna baru arm'
      ],
    },
    {
      serviceName: 'Cuci Reguler',
      keywords: [
        'cuci motor', 'cuci biasa', 'cuci standar', 'semir ban',
        'cuci luar aja', 'cuci harian', 'cuci kilat', 'cuci cepat',
        'cuci murah', 'cuci kilau'
      ],
    },
    {
      serviceName: 'Cuci Premium',
      keywords: [
        'cuci premium', 'cuci wax', 'cuci kilap', 'cuci mewah',
        'cuci mengkilap', 'cuci glow up', 'cuci bersih banget', 'cuci plus wax',
        'cuci detail', 'upgrade cuci'
      ],
    },
    {
      serviceName: 'Detailing Mesin',
      keywords: [
        'cuci mesin', 'detailing mesin', 'bersihin mesin', 'kerak oli',
        'pembersih crankcase', 'cuci ruang mesin', 'crankcase detailing',
        'mesin bersih banget', 'cuci sela mesin', 'bersih oli bocor'
      ],
    },
    {
      serviceName: 'Cuci Komplit',
      keywords: [
        'cuci total', 'cuci bongkar', 'deep clean motor', 'cuci telanjang',
        'cuci bongkar pasang', 'cuci bersih sampai rangka', 'cuci semua bagian',
        'cuci dalam banget', 'cuci total motor', 'bongkar cuci', 'detailing cuci'
      ],
    },
    {
      serviceName: 'Poles Bodi Glossy',
      keywords: [
        'poles bodi', 'poles cat', 'kilapin bodi', 'poles baret',
        'poles baret halus', 'poles kilap', 'poles glossy', 'bodi kinclong',
        'kilap ulang', 'poles full body', 'poles permukaan bodi'
      ],
    },
    {
      serviceName: 'Full Detailing Glossy',
      keywords: [
        'detailing full', 'detailing total', 'detailing kilap', 'detailing ultimate',
        'detailing glossy', 'detailing dan poles', 'restorasi bodi',
        'detailing komplit', 'detailing luar dalam', 'detailing kilap maksimal',
        'detailing pamungkas'
      ],
    }
  ];

  for (const service of serviceKeywordsMap) {
    const match = service.keywords.find(keyword => msg.includes(keyword));
    if (match) {
      // ✅ REVISI: Logika diubah untuk memastikan nilai boolean yang jelas.
      // Jika ada penanda 'isAmbiguousOnKeyword' dan keyword yang cocok adalah itu, maka isAmbiguous = true.
      // Jika tidak, maka isAmbiguous = false.
      const isAmbiguous = service.isAmbiguousOnKeyword === match;
      
      return {
        serviceName: service.serviceName,
        isAmbiguous: isAmbiguous,
      };
    }
  }

  return null;
}