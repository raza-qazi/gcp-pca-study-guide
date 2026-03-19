import { useState } from 'react'
import K8sSidebar    from './k8s/K8sSidebar'
import Cluster       from './k8s/sections/Cluster'
import Monitoring    from './k8s/sections/Monitoring'
import Networking    from './k8s/sections/Networking'
import Auth          from './k8s/sections/Auth'
import Debug         from './k8s/sections/Debug'
import Hybrid        from './k8s/sections/Hybrid'
import Compare       from './k8s/sections/Compare'
import s             from './K8sApp.module.css'

const VIEWS = {
  cluster:    Cluster,
  monitoring: Monitoring,
  networking: Networking,
  auth:       Auth,
  debug:      Debug,
  hybrid:     Hybrid,
  compare:    Compare,
}

export default function K8sApp() {
  const [active, setActive] = useState('cluster')
  const View = VIEWS[active] || Cluster

  return (
    <div className={s.app}>
      <K8sSidebar active={active} setActive={setActive} />
      <main className={s.main}>
        <View />
      </main>
    </div>
  )
}
