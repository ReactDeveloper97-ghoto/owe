// src/lib/supabase.js - SIMPLE VERSION
import { createClient } from '@supabase/supabase-js'

// Direct values (no env needed for testing)
const supabaseUrl = 'https://xdbbqlwyzdtifrsbutxu.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkYmJxbHd5emR0aWZyc2J1dHh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU5OTU0NTYsImV4cCI6MjA4MTU3MTQ1Nn0.unZnQ_qxfuPrrXvD5yXxJMnLbyoxBIqGoOQxtIU56Vg'

// Create client
export const supabase = createClient(supabaseUrl, supabaseKey)

// Test function
export const testConnection = async () => {
  try {
    const { data, error } = await supabase.auth.getSession()
    if (error) throw error
    return { success: true, session: data.session }
  } catch (err) {
    return { success: false, error: err.message }
  }
}