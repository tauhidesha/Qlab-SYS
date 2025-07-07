// File: app/ai/lib/classifiers/mapTermToOfficialService.ts

/**
 * Mengubah istilah bebas dari user menjadi nama layanan resmi.
 */
export function mapTermToOfficialService(message: string): string | null {
  const msg = message.toLowerCase();

  const serviceKeywordsMap = [
    {
      officialName: 'Coating Motor Glossy',
      keywords: ['coating glossy', 'nano coating', 'coating kilap', 'ceramic glossy', 'wetlook', 'kilap daun talas']
    },
    {
      officialName: 'Coating Motor Doff',
      keywords: ['coating doff', 'nano doff', 'coating matte', 'matte coating', 'keramik doff']
    },
    {
      officialName: 'Complete Service Glossy',
      keywords: ['complete glossy', 'paket glossy', 'coating + detailing', 'glossy total']
    },
    {
      officialName: 'Complete Service Doff',
      keywords: ['complete doff', 'paket doff', 'detailing doff', 'coating doff full']
    },
    {
      officialName: 'Repaint Bodi Halus',
      keywords: ['cat bodi', 'repaint halus', 'cat ulang halus', 'warna ulang']
    },
    {
      officialName: 'Repaint Bodi Kasar',
      keywords: ['cat dek', 'repaint kasar', 'cat hitam doff', 'cat ulang kasar']
    },
    {
      officialName: 'Repaint Velg',
      keywords: ['cat velg', 'repaint velg', 'cat ulang velg', 'warna ulang velg']
    },
    {
      officialName: 'Repaint Cover CVT / Arm',
      keywords: ['cat cvt', 'repaint arm', 'cat ulang arm', 'cat ulang mesin']
    },
    {
      officialName: 'Cuci Reguler',
      keywords: ['cuci motor', 'cuci biasa', 'cuci standar', 'semir ban']
    },
    {
      officialName: 'Cuci Premium',
      keywords: ['cuci premium', 'cuci wax', 'cuci kilap', 'cuci mewah']
    },
    {
      officialName: 'Detailing Mesin',
      keywords: ['cuci mesin', 'detailing mesin', 'bersihin mesin', 'kerak oli']
    },
    {
      officialName: 'Cuci Komplit',
      keywords: ['cuci total', 'cuci bongkar', 'deep clean motor', 'cuci telanjang']
    },
    {
      officialName: 'Poles Bodi Glossy',
      keywords: ['poles bodi', 'poles cat', 'kilapin bodi', 'poles baret']
    },
    {
      officialName: 'Full Detailing Glossy',
      keywords: ['detailing full', 'detailing total', 'detailing kilap', 'detailing ultimate']
    }
  ];

  for (const service of serviceKeywordsMap) {
    if (service.keywords.some(keyword => msg.includes(keyword))) {
      return service.officialName;
    }
  }

  return null;
}
