const ALPHA_NUMERIC = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

function generateAuthToken() {
    const len = 10
    let result = ""

    for (let i = 0; i < len; i++) {
        result += ALPHA_NUMERIC.charAt(Math.floor(Math.random() * ALPHA_NUMERIC.length))
    }

    return result
}

export default generateAuthToken