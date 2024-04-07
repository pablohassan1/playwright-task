const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator');

export const firstName: string = uniqueNamesGenerator({ dictionaries: [animals], style: 'capital' });
export const lastName: string = uniqueNamesGenerator({ dictionaries: [colors], style: 'capital' });
export const email: string = `${firstName}${lastName}@${uniqueNamesGenerator({ dictionaries: [adjectives]})}.com`;
export const password: string = 'P@ssword123'