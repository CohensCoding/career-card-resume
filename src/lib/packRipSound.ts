/**
 * Pack tear SFX: primary clip from `/sounds/pack-rip.webm` (user-supplied source:
 * https://www.youtube.com/watch?v=p5M-7YDBrVo), with procedural Web Audio fallback
 * if the file is missing or playback is blocked.
 */
const PACK_RIP_URL = '/sounds/pack-rip.webm'

let ripAudio: HTMLAudioElement | null = null

function getRipAudio(): HTMLAudioElement | null {
  if (typeof window === 'undefined') return null
  if (!ripAudio) {
    ripAudio = new Audio(PACK_RIP_URL)
    ripAudio.preload = 'auto'
  }
  return ripAudio
}

export function playPackRipSound(): void {
  const el = getRipAudio()
  if (el) {
    el.currentTime = 0
    const p = el.play()
    if (p !== undefined) {
      p.catch(() => {
        playProceduralPackRipSound()
      })
      return
    }
  }
  playProceduralPackRipSound()
}

function playProceduralPackRipSound(): void {
  try {
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    if (!Ctx) return
    const ctx = new Ctx()
    const now = ctx.currentTime
    const master = ctx.createGain()
    master.gain.setValueAtTime(0.0001, now)
    master.gain.exponentialRampToValueAtTime(0.55, now + 0.04)
    master.gain.exponentialRampToValueAtTime(0.08, now + 2.4)
    master.connect(ctx.destination)

    const dur = 2.2
    const bufferSize = ctx.sampleRate * dur
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const data = noiseBuffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize) ** 0.35
    }
    const noise = ctx.createBufferSource()
    noise.buffer = noiseBuffer
    const bp = ctx.createBiquadFilter()
    bp.type = 'bandpass'
    bp.frequency.setValueAtTime(1800, now)
    bp.frequency.exponentialRampToValueAtTime(420, now + 1.2)
    bp.frequency.linearRampToValueAtTime(2800, now + 2.0)
    bp.Q.setValueAtTime(0.6, now)
    const nGain = ctx.createGain()
    nGain.gain.setValueAtTime(0.85, now)
    noise.connect(bp)
    bp.connect(nGain)
    nGain.connect(master)
    noise.start(now)
    noise.stop(now + dur)

    const osc = ctx.createOscillator()
    osc.type = 'sawtooth'
    osc.frequency.setValueAtTime(95, now)
    osc.frequency.exponentialRampToValueAtTime(38, now + 0.35)
    const oFilter = ctx.createBiquadFilter()
    oFilter.type = 'lowpass'
    oFilter.frequency.setValueAtTime(420, now)
    oFilter.frequency.exponentialRampToValueAtTime(90, now + 1.8)
    const oGain = ctx.createGain()
    oGain.gain.setValueAtTime(0.12, now)
    oGain.gain.exponentialRampToValueAtTime(0.001, now + 1.9)
    osc.connect(oFilter)
    oFilter.connect(oGain)
    oGain.connect(master)
    osc.start(now)
    osc.stop(now + 2.0)

    const osc2 = ctx.createOscillator()
    osc2.type = 'sine'
    osc2.frequency.setValueAtTime(220, now + 0.5)
    osc2.frequency.exponentialRampToValueAtTime(880, now + 1.6)
    const g2 = ctx.createGain()
    g2.gain.setValueAtTime(0, now)
    g2.gain.linearRampToValueAtTime(0.06, now + 0.65)
    g2.gain.exponentialRampToValueAtTime(0.001, now + 2.1)
    osc2.connect(g2)
    g2.connect(master)
    osc2.start(now + 0.45)
    osc2.stop(now + 2.2)

    ctx.resume().catch(() => {})
    window.setTimeout(() => {
      ctx.close().catch(() => {})
    }, 2600)
  } catch {
    /* ignore */
  }
}
