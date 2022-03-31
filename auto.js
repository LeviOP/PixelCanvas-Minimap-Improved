let m_timeUntil = new Date(store.getState().user.wait).getTime() - Date.now();
if(m_timeUntil) {
    setTimeout(m_next, m_timeUntil)
} else {
    m_next()
}

let m_x = 0;
let m_y = 0;

let m_width = pixels[0].length - 1;
let m_height = pixels.length - 1;

let m_px = -319;
let m_py = 207;

function m_next() {
    const m_c = pixels[m_y][m_x];
    if (m_c === -1) return m_adv();
    const m_pos = [m_x + m_px, m_y + m_py];
    if (isSameColorIn(store.getState(), m_pos, m_c)) return m_adv();
    store.dispatch(tryPlacePixel(m_pos, toast, m_c));
    setTimeout(() => {
        let m_timeUntil = new Date(store.getState().user.wait).getTime() - Date.now();
        if (m_timeUntil) {
            setTimeout(m_adv, m_timeUntil);
        } else {
            console.log("AUTOPLACE ERROR: NO DELAY")
            //m_adv()
        }
    }, 5000)
    //console.log(`store.dispatch(tryPlacePixel([${m_tx}, ${m_ty}], toast, ${m_c}))`)
    //console.log(`x: ${m_tx}, y: ${m_ty}, color: ${m_p}, isSameColorIn(): ${isSameColorIn(store.getState(), [m_tx, m_ty], 1)}`)
}

function m_adv() {
    if (m_x >= m_width) {
        m_x = 0;
        m_y++;
    } else {
        m_x++;
    }
    m_next()
}
