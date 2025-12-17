// src/components/TestConnection.jsx - UPDATED
import { useEffect, useState } from 'react'
import { supabase, testConnection } from '../lib/supabase' // ✅ Updated import path

const TestConnection = () => {
    const [status, setStatus] = useState('Testing...')
    const [tables, setTables] = useState([])
    const [authStatus, setAuthStatus] = useState('Checking...')
    const [envDetails, setEnvDetails] = useState({})

    useEffect(() => {
        testConnection()
    }, [])

    const testConnection = async () => {
        try {
            // Show environment details
            setEnvDetails({
                url: import.meta.env.VITE_SUPABASE_URL ? '✅ Loaded' : '❌ Missing',
                key: import.meta.env.VITE_SUPABASE_ANON_KEY ? '✅ Loaded' : '❌ Missing'
            })

            // Test 1: Check Supabase URL
            const url = import.meta.env.VITE_SUPABASE_URL
            setStatus(`URL: ${url ? '✅ Found' : '❌ Missing'}`)
            
            // Test 2: Check connection
            const connected = await testConnection()
            if (!connected) {
                setTables('❌ Connection failed')
                return
            }

            // Test 3: Try to fetch from users table
            const { data, error } = await supabase
                .from('users')
                .select('*')
                .limit(1)
            
            if (error) {
                setTables(`Table error: ${error.message}`)
            } else {
                setTables(`✅ Users table accessible (${data?.length || 0} rows)`)
            }

            // Test 4: Check auth
            const { data: authData } = await supabase.auth.getSession()
            setAuthStatus(authData.session ? '✅ Auth connected' : '⚠️ No active session')

        } catch (err) {
            setStatus(`❌ Error: ${err.message}`)
        }
    }

    return (
        <div style={{ padding: '20px', fontFamily: 'monospace' }}>
            <h2>Supabase Connection Test</h2>
            
            <div style={{ margin: '10px 0', background: '#f0f0f0', padding: '10px', borderRadius: '5px' }}>
                <strong>Environment Variables:</strong>
                <pre>{JSON.stringify(envDetails, null, 2)}</pre>
            </div>
            
            <div style={{ margin: '10px 0' }}>
                <strong>URL Status:</strong> {status}
            </div>
            <div style={{ margin: '10px 0' }}>
                <strong>Database:</strong> {tables}
            </div>
            <div style={{ margin: '10px 0' }}>
                <strong>Authentication:</strong> {authStatus}
            </div>
            <button 
                onClick={testConnection}
                style={{ 
                    padding: '10px 20px', 
                    background: '#007698', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '5px',
                    marginTop: '20px'
                }}
            >
                Test Again
            </button>
        </div>
    )
}

export default TestConnection