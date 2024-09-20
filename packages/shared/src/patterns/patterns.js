export const validationPatterns = {
    validatePasswordLength: {
        pattern: /(?=.{8,})/,
        message: 'Password must have at least 8 characters',
    },
    passwordContainsNumericCharacters: {
        pattern: /(?=.*[0-9])/,
        message: 'Password must have at least 1 numeric characters',
    },
    passwordContainsUpperCaseCharacter: {
        pattern: /(?=.*[A-Z])/,
        message: 'Password must have at least 1 uppercase alphabetical character',
    },
    passwordContainsLowerCaseCharacter: {
        pattern: /(?=.*[a-z])/,
        message: 'Password must have at least 1 lowercase alphabetical character',
    },
    validateUsernameLength: {
        pattern: /(?=.{5,})/,
        message: 'Username must have at least 5 characters',
    },
    validateUsernameCharacters: {
        pattern: /^[a-zA-Z0-9_\-.]{5,}$/,
        message: 'Only characters (a-z), (A-Z), (0-9), -, _, . are available',
    },
    /*
        \p{Pd} - dash connectors
        \p{Pc} - connector punctuations
        \p{Cf} - invisible formatting indicator
        \p{L} - any alphabetic character
        Useful links:
        https://stackoverflow.com/questions/4323386/multi-language-input-validation-with-utf-8-encoding
        https://stackoverflow.com/questions/280712/javascript-unicode-regexes
        https://stackoverflow.com/questions/6377407/how-to-validate-both-chinese-unicode-and-english-name
    */
    validateName: {
        // eslint-disable-next-line
        pattern: /^(\p{L}|\p{Pd}|\p{Cf}|\p{Pc}|['\s]){2,}$/gu,
        message: 'Invalid name',
    },
    validateURL: {
        // eslint-disable-next-line
        pattern: /^((https?:\/\/)|((ssh:\/\/)?git@))[^\s$.?#].[^\s]*$/, // url, ssh url, ip
        message: 'URL is not valid',
    },
    validatePath: {
        // eslint-disable-next-line
        pattern: /^\[\/?([A-z0-9-_+]+\/)*([A-z0-9]+\.(xml|zip|json))\]$/,
        message: 'Git path is not valid',
    },
    validateSlug: {
        pattern: /^[a-zA-Z\d]+$/,
        message: 'Only Latin characters and numbers are allowed',
    },
    validatePhoneLength: {
        pattern: /(?=.{11,15})/,
        message: 'Phone must have at least 11 digits',
    },
    validatePhoneNumber: {
        pattern: /^(01)\d$/,
        message: 'Input phone number is not correct',
    },
    validateLatinDigits: {
        pattern: /^[0-9]+$/g,
        message: 'Only Latin numbers are allowed',
    },
    validateLngLat: {
        pattern: /^[+-]?[0-9]*\.?[0-9]+/gm,
        message: 'Invalid latitude/longitude point',
    },
    validateArabicCharacters: {
        pattern: /^[\u0600-\u06FF\s0-9.,!?'"-]+$/,
        message: 'فقط الحروف العربية مسموح بها',
    },
    validateEnglishCharacters: {
        pattern: /^[a-zA-Z\s0-9.,!?'"-]+$/,
        message: 'Only English characters and common punctuation marks are allowed',
    },
};
