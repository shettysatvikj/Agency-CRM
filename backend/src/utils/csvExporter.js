import { Parser } from 'json2csv';

export const leadsToCSV = (leads) => {
  const fields = [
    'name',
    'email',
    'phone',
    'source',
    'status',
    'budget',
    'notes',
    'createdAt',
    'updatedAt',
  ];
  const parser = new Parser({ fields });
  return parser.parse(leads);
};