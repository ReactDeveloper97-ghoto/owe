// SIMPLE SetupTest.jsx
import { useEffect, useState } from 'react'
import { supabase, testConnection } from '../lib/supabase'

const SimpleSetupTest = () => {
  const [result, setResult] = useState('Testing...')

  useEffect(() => {
    test()
  }, [])

  const test = async () => {
    const connection = await testConnection()
    setResult(connection.success ? '✅ Connected!' : `❌ Error: ${connection.error}`)
  }

  return (
    <div style={{ padding: '40px' }}>
      <h1>Supabase Connection Test</h1>
      <p>Status: {result}</p>
      <button onClick={test}>Test Again</button>
    </div>
  )
}

export default SimpleSetupTest