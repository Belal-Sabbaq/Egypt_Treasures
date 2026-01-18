export type VisaRequirement = 'NONE' | 'REQUIRED';

export const NATIONALITIES = [
    { code: 'EG', name: 'Egypt', visaRequired: false },
    { code: 'SA', name: 'Saudi Arabia', visaRequired: false },
    { code: 'AE', name: 'United Arab Emirates', visaRequired: false },
    { code: 'KW', name: 'Kuwait', visaRequired: false },
    { code: 'QA', name: 'Qatar', visaRequired: false },
    { code: 'OM', name: 'Oman', visaRequired: false },
    { code: 'BH', name: 'Bahrain', visaRequired: false },
    { code: 'US', name: 'United States', visaRequired: true },
    { code: 'GB', name: 'United Kingdom', visaRequired: true },
    { code: 'FR', name: 'France', visaRequired: true },
    { code: 'DE', name: 'Germany', visaRequired: true },
    { code: 'IT', name: 'Italy', visaRequired: true },
    { code: 'ES', name: 'Spain', visaRequired: true },
    { code: 'CN', name: 'China', visaRequired: true },
    { code: 'JP', name: 'Japan', visaRequired: true },
    { code: 'RU', name: 'Russia', visaRequired: true },
    { code: 'OTHER', name: 'Other', visaRequired: true },
];

export function getVisaRequirement(nationalityCode: string): VisaRequirement {
    const nat = NATIONALITIES.find(n => n.code === nationalityCode);
    return nat?.visaRequired ? 'REQUIRED' : 'NONE';
}
