import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'
import { PROJECTS } from './projects'
import { CmdBackIcon, CmdOpenIcon, CmdOptionsIcon } from './SaveIcons'
import { getSaveIcon } from './saveIconMap'
import './MemoryCard.css'

type Props = {
  visible: boolean
  onSelectProject: (id: string) => void
  onRelaunchIntro?: () => void
}

export type MemoryCardHandle = {
  focusIndex: (i: number) => void
  moveFocus: (delta: number) => void
  moveFocusByRow: (rowDelta: number) => void
  openFocused: () => void
}

type Slot =
  | { kind: 'project'; id: string; label: string }
  | { kind: 'empty'; id: `empty-${number}`; label: string }

function pad2(n: number) {
  return String(n).padStart(2, '0')
}

export const MemoryCard = forwardRef<MemoryCardHandle, Props>(function MemoryCard(
  { visible, onSelectProject, onRelaunchIntro },
  ref,
) {
  const slots: Slot[] = useMemo(() => {
    const real: Slot[] = PROJECTS.map((p) => ({ kind: 'project', id: p.id, label: p.name }))
    const empties: Slot[] = Array.from({ length: 4 }, (_, i) => ({
      kind: 'empty',
      id: `empty-${i}` as const,
      label: '— empty —',
    }))
    return [...real, ...empties]
  }, [])

  const [focusedIndex, setFocusedIndex] = useState(0)
  const [clock, setClock] = useState('—:—')
  const cols = useRef<number>(5)

  useEffect(() => {
    const updateCols = () => {
      cols.current = window.innerWidth < 900 ? 3 : 5
    }
    updateCols()
    window.addEventListener('resize', updateCols)
    return () => window.removeEventListener('resize', updateCols)
  }, [])

  useEffect(() => {
    const updateClock = () => {
      const now = new Date()
      setClock(`${pad2(now.getHours())}:${pad2(now.getMinutes())}`)
    }
    const t = window.setInterval(updateClock, 30000)
    updateClock()
    return () => window.clearInterval(t)
  }, [])

  const focusSlot = useCallback((i: number) => {
    const next = (i + slots.length) % slots.length
    setFocusedIndex(next)
  }, [slots.length])

  const openFocused = useCallback(() => {
    const slot = slots[focusedIndex]
    if (slot.kind !== 'project') return
    onSelectProject(slot.id)
  }, [focusedIndex, onSelectProject, slots])

  useImperativeHandle(
    ref,
    () => ({
      focusIndex: focusSlot,
      moveFocus: (delta) => focusSlot(focusedIndex + delta),
      moveFocusByRow: (rowDelta) => focusSlot(focusedIndex + cols.current * rowDelta),
      openFocused,
    }),
    [focusSlot, focusedIndex, openFocused],
  )

  return (
    <div className={`memory-card ${visible ? 'visible' : ''}`}>
      <div className="mc-top">
        <div className="mc-top-left">
          <div className="breadcrumb">/ portfolio · memory card 01</div>
          <div className="title">Project Library</div>
          <div className="subtitle">
            A small collection of things I&apos;ve built. Click any file to inspect.
          </div>
        </div>
        <div className="mc-top-right">
          <div>5 / 9 · saved</div>
          <div>
            <span className="stat-value">{clock}</span>
          </div>
          <div>los angeles</div>
        </div>
      </div>

      <div className="mc-floor">
        {slots.map((s, i) => {
          const isFocused = i === focusedIndex
          const isEmpty = s.kind === 'empty'
          const id = s.kind === 'project' ? s.id : s.id

          return (
            <div
              key={id}
              className={`slot ${isEmpty ? 'empty' : ''} ${isFocused ? 'focused' : ''}`}
              onMouseEnter={() => focusSlot(i)}
              onClick={() => {
                if (isEmpty) return
                onSelectProject((s as Extract<Slot, { kind: 'project' }>).id)
              }}
              role={isEmpty ? 'presentation' : 'button'}
              tabIndex={isEmpty ? -1 : 0}
              aria-label={isEmpty ? undefined : `Open ${s.label}`}
            >
              <div className="slot-icon">
                {getSaveIcon(isEmpty ? 'empty' : (s as Extract<Slot, { kind: 'project' }>).id)}
              </div>
              <div className="slot-label">{s.label}</div>
            </div>
          )
        })}
      </div>

      <div className="mc-cmd">
        <div className="cmd">
          <div className="cmd-glyph">
            <CmdOpenIcon />
          </div>
          Open
        </div>
        {onRelaunchIntro ? (
          <button
            type="button"
            className="cmd cmd-button"
            onClick={onRelaunchIntro}
            aria-label="Replay intro boot sequence"
          >
            <div className="cmd-glyph" aria-hidden>
              <CmdBackIcon />
            </div>
            Replay intro
          </button>
        ) : (
          <div className="cmd" aria-hidden>
            <div className="cmd-glyph">
              <CmdBackIcon />
            </div>
            Back
          </div>
        )}
        <div className="cmd">
          <div className="cmd-glyph">
            <CmdOptionsIcon />
          </div>
          Options
        </div>
      </div>
    </div>
  )
})

