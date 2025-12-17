// src/components/DatabaseTest.jsx
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const DatabaseTest = () => {
  const [results, setResults] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    testAllTables()
  }, [])

  const testAllTables = async () => {
    try {
      const tests = {
        users: await supabase.from('users').select('count', { count: 'exact', head: true }),
        students: await supabase.from('students').select('count', { count: 'exact', head: true }),
        programs: await supabase.from('programs').select('*'),
        enrollments: await supabase.from('enrollments').select('count', { count: 'exact', head: true }),
        payments: await supabase.from('payments').select('count', { count: 'exact', head: true })
      }

      const results = {}
      for (const [table, response] of Object.entries(tests)) {
        if (response.error) {
          results[table] = { status: '❌', error: response.error.message }
        } else {
          const count = table === 'programs' 
            ? response.data.length 
            : response.count || response.data.length
          results[table] = { status: '✅', count }
        }
      }

      setResults(results)
    } catch (err) {
      console.error('Test error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: '30px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ color: '#007698' }}>Database Connection Test</h1>
      
      {loading ? (
        <p>Testing database connections...</p>
      ) : (
        <div style={{ marginTop: '20px' }}>
          <h3>Table Status:</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
            <thead>
              <tr style={{ background: '#f0f0f0' }}>
                <th style={{ padding: '10px', textAlign: 'left' }}>Table</th>
                <th style={{ padding: '10px', textAlign: 'left' }}>Status</th>
                <th style={{ padding: '10px', textAlign: 'left' }}>Records</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(results).map(([table, data]) => (
                <tr key={table} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '10px' }}>
                    <strong>{table}</strong>
                  </td>
                  <td style={{ padding: '10px', color: data.status === '✅' ? 'green' : 'red' }}>
                    {data.status}
                  </td>
                  <td style={{ padding: '10px' }}>
                    {data.error ? data.error : data.count}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {results.programs?.status === '✅' && (
            <div style={{ marginTop: '30px' }}>
              <h3>Available Programs:</h3>
              <ul>
                {results.programs.data?.map((program, index) => (
                  <li key={index} style={{ margin: '5px 0' }}>
                    <strong>{program.name}</strong> - {program.grade_level} (${program.price})
                  </li>
                ))}
              </ul>
            </div>
          )}

          <button
            onClick={testAllTables}
            style={{
              background: '#007698',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '5px',
              cursor: 'pointer',
              marginTop: '20px'
            }}
          >
            Test Again
          </button>
        </div>
      )}

      <div style={{ 
        background: '#e7f5ff', 
        padding: '20px', 
        borderRadius: '10px',
        marginTop: '30px'
      }}>
        <h3>What to do next:</h3>
        <ol>
          <li>Test Parent Login functionality</li>
          <li>Build Parent Dashboard with real data</li>
          <li>Add more sample data as needed</li>
          <li>Test authentication flows</li>
        </ol>
      </div>
    </div>
  )
}

export default DatabaseTest