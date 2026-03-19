import { useState, useCallback } from 'react'
import { QUESTIONS } from '../../data/gcp/questions'
import styles from './Quiz.module.css'

const ALL_CATS = ['All', ...Array.from(new Set(QUESTIONS.map(q => q.cat)))]

// ── Sub-components ────────────────────────────────────────────────────────────

function Setup({ onStart, missedIds }) {
  const [cat, setCat] = useState('All')

  const countFor = c => c === 'All' ? QUESTIONS.length : QUESTIONS.filter(q => q.cat === c).length

  return (
    <div className={`${styles.setup} fade-up`}>
      <h2 className={styles.setupTitle}>PCA Practice Quiz</h2>
      <p className={styles.setupSub}>
        {QUESTIONS.length} scenario-based questions across all exam domains.
        Choose a category or test everything.
      </p>

      <div className={styles.catGrid}>
        {ALL_CATS.map(c => (
          <button
            key={c}
            className={`${styles.catCard} ${cat === c ? styles.catActive : ''}`}
            onClick={() => setCat(c)}
          >
            <span className={styles.catName}>{c}</span>
            <span className={styles.catCount}>{countFor(c)} questions</span>
          </button>
        ))}
      </div>

      <div className={styles.setupActions}>
        <button className="btn-primary" onClick={() => onStart(cat, null)}>
          Start Quiz →
        </button>
        {missedIds.length > 0 && (
          <button className="btn-ghost" onClick={() => onStart(null, missedIds)}>
            Review {missedIds.length} Missed
          </button>
        )}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────

function Question({ q, index, total, score, onAnswer, onNext, onQuit }) {
  const [chosen, setChosen] = useState(null)

  const pick = (i) => {
    if (chosen !== null) return
    setChosen(i)
    onAnswer(i === q.ans)
  }

  const optClass = (i) => {
    if (chosen === null) return styles.opt
    if (i === q.ans)                   return `${styles.opt} ${styles.optCorrect}`
    if (i === chosen && chosen !== q.ans) return `${styles.opt} ${styles.optWrong}`
    return `${styles.opt} ${styles.optFaded}`
  }

  return (
    <div className={`${styles.qWrap} fade-up`} key={q.id}>
      {/* Progress */}
      <div className={styles.progress}>
        <span className={styles.progressText}>
          Q{index + 1} / {total}
        </span>
        <div className={styles.bar}>
          <div className={styles.barFill} style={{ width: `${(index / total) * 100}%` }} />
        </div>
        <span className={styles.scoreText}>{score.correct} / {score.total} correct</span>
      </div>

      {/* Badges */}
      <div className={styles.badges}>
        <span className={styles.catBadge}>{q.cat}</span>
        <span className={styles.domainBadge}>{q.domain}</span>
      </div>

      {/* Question */}
      <p className={styles.qText}>{q.q}</p>

      {/* Options */}
      <div className={styles.opts}>
        {q.opts.map((opt, i) => (
          <button key={i} className={optClass(i)} disabled={chosen !== null} onClick={() => pick(i)}>
            <span className={styles.letter}>{String.fromCharCode(65 + i)}</span>
            <span>{opt}</span>
          </button>
        ))}
      </div>

      {/* Explanation */}
      {chosen !== null && (
        <div className={`${styles.explanation} fade-up`}>
          <span className={styles.expLabel}>Explanation</span>
          <p className={styles.expText}>{q.exp}</p>
        </div>
      )}

      {/* Actions */}
      <div className={styles.qActions}>
        {chosen !== null && (
          <button className="btn-primary" onClick={() => { setChosen(null); onNext() }}>
            {index + 1 < total ? 'Next Question →' : 'See Results'}
          </button>
        )}
        <button className="btn-ghost" onClick={onQuit}>Quit</button>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────

function Results({ score, missedCount, isReview, onRetry, onReviewMissed, onReset }) {
  const pct = score.total ? Math.round((score.correct / score.total) * 100) : 0
  const grade = pct >= 85 ? '🎉 PCA Ready' : pct >= 70 ? '📈 Keep Studying' : '🔁 Review Weak Areas'
  const gradeColor = pct >= 85 ? '#4ade80' : pct >= 70 ? '#fbbf24' : '#f87171'

  return (
    <div className={`${styles.results} fade-up`}>
      <div className={styles.resultCard}>
        <p className={styles.resultSub}>{isReview ? 'Review' : 'Quiz'} Complete</p>
        <p className={styles.bigScore}>{score.correct}<span>/{score.total}</span></p>
        <p className={styles.pct} style={{ color: gradeColor }}>{pct}%</p>
        <p className={styles.grade} style={{ color: gradeColor }}>{grade}</p>
      </div>

      <div className={styles.resultActions}>
        <button className="btn-primary" onClick={onRetry}>Try Again</button>
        {missedCount > 0 && (
          <button className="btn-ghost" onClick={onReviewMissed}>
            Review {missedCount} Missed
          </button>
        )}
        <button className="btn-ghost" onClick={onReset}>Reset All</button>
      </div>
    </div>
  )
}

// ── Main Quiz component ───────────────────────────────────────────────────────

export default function Quiz() {
  const [phase,     setPhase]     = useState('setup')   // setup | active | done
  const [bank,      setBank]      = useState([])
  const [idx,       setIdx]       = useState(0)
  const [score,     setScore]     = useState({ correct: 0, total: 0 })
  const [missedIds, setMissedIds] = useState([])
  const [isReview,  setIsReview]  = useState(false)

  const startQuiz = useCallback((cat, ids) => {
    let pool = ids
      ? QUESTIONS.filter(q => ids.includes(q.id))
      : cat === 'All' ? [...QUESTIONS] : QUESTIONS.filter(q => q.cat === cat)

    // shuffle
    pool = [...pool].sort(() => Math.random() - 0.5)

    setBank(pool)
    setIdx(0)
    setScore({ correct: 0, total: 0 })
    setMissedIds([])
    setIsReview(!!ids)
    setPhase('active')
  }, [])

  const handleAnswer = useCallback((correct) => {
    setScore(s => ({ correct: s.correct + (correct ? 1 : 0), total: s.total + 1 }))
    if (!correct) setMissedIds(prev => [...prev, bank[idx].id])
  }, [bank, idx])

  const handleNext = useCallback(() => {
    const next = idx + 1
    if (next >= bank.length) {
      setPhase('done')
    } else {
      setIdx(next)
    }
  }, [idx, bank.length])

  const handleReviewMissed = useCallback(() => {
    startQuiz(null, missedIds)
  }, [missedIds, startQuiz])

  const handleReset = () => {
    setMissedIds([])
    setPhase('setup')
  }

  // ── Render ──
  if (phase === 'setup') {
    return <Setup onStart={startQuiz} missedIds={missedIds} />
  }

  if (phase === 'done') {
    return (
      <Results
        score={score}
        missedCount={missedIds.length}
        isReview={isReview}
        onRetry={() => setPhase('setup')}
        onReviewMissed={handleReviewMissed}
        onReset={handleReset}
      />
    )
  }

  // active
  return (
    <Question
      key={bank[idx].id}
      q={bank[idx]}
      index={idx}
      total={bank.length}
      score={score}
      onAnswer={handleAnswer}
      onNext={handleNext}
      onQuit={() => setPhase('setup')}
    />
  )
}
