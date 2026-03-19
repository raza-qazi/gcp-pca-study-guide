import { useState } from 'react'
import Shell   from './components/Shell'
import GcpApp  from './components/GcpApp'
import K8sApp  from './components/K8sApp'
import s       from './styles/App.module.css'

export const APPS = [
  {
    id:    'gcp',
    label: 'GCP PCA Study',
    sub:   'Professional Cloud Architect',
    icon:  '☁',
    color: '#34A853',
    desc:  'Services, quiz, and comparison for the GCP Professional Cloud Architect exam.',
  },
  {
    id:    'k8s',
    label: 'Kubernetes Guide',
    sub:   'EKS · GKE · AKS · 2026',
    icon:  '⎈',
    color: '#326CE5',
    desc:  'Cluster management, networking, auth, debugging, and multi-cloud K8s deep-dives.',
  },
]

export default function App() {
  const [activeApp, setActiveApp] = useState('gcp')

  return (
    <div className={s.root}>
      <Shell activeApp={activeApp} setActiveApp={setActiveApp} />
      <div className={s.content}>
        {activeApp === 'gcp' && <GcpApp />}
        {activeApp === 'k8s' && <K8sApp />}
      </div>
    </div>
  )
}
