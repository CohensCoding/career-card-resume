import { useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import type { Project } from './projects'
import { getSaveIcon } from './saveIconMap'
import './FileInspector.css'

type Props = {
  project: Project
  onClose: () => void
}

export function FileInspector({ project, onClose }: Props) {
  const navigate = useNavigate()
  const action = project.action

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const primary = useMemo(() => {
    switch (action.kind) {
      case 'route':
        return {
          label: 'Open Project →',
          disabled: false,
          onClick: () => navigate(action.to),
        }
      case 'external':
        return {
          label: 'Open Project →',
          disabled: false,
          onClick: () => window.open(action.href, '_blank', 'noopener,noreferrer'),
        }
      case 'pdf':
        return {
          label: 'Open Project →',
          disabled: false,
          onClick: () => window.open(action.href, '_blank', 'noopener,noreferrer'),
        }
      case 'soon':
      default:
        return { label: 'Coming Soon', disabled: true, onClick: undefined as unknown as () => void }
    }
  }, [action, navigate])

  return (
    <motion.div
      className="file-inspector detail-in"
      initial={{ opacity: 0, scale: 0.985 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.name} file inspector`}
    >
      <div className="dv-top">
        <div className="dv-top-left">
          <div className="breadcrumb">/ portfolio · memory card 01 · file</div>
          <div className="title">File Inspector</div>
        </div>
        <button type="button" className="dv-close" onClick={onClose}>
          Close ✕
        </button>
      </div>

      <div className="dv-body">
        <div className="dv-icon-stage" aria-hidden>
          {getSaveIcon(project.id)}
        </div>
        <div className="dv-info">
          <div className="dv-filename">{project.filename}</div>
          <h1 className="dv-name">{project.name}</h1>
          <div className="dv-tags">
            {project.tags.map((t) => (
              <div key={t} className="dv-tag">
                {t}
              </div>
            ))}
          </div>
          <p className="dv-description">{project.description}</p>
          <div className="dv-meta">
            {Object.entries(project.meta).map(([k, v]) => (
              <span key={k}>
                {k}: <strong>{v}</strong>
              </span>
            ))}
          </div>
          <div className="dv-actions">
            <button
              type="button"
              className="dv-button"
              disabled={primary.disabled}
              onClick={primary.disabled ? undefined : primary.onClick}
            >
              {primary.label}
            </button>
            <button type="button" className="dv-button secondary" onClick={onClose}>
              Back
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

