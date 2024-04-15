"use client"
import { getAllTodos } from '@/utils/supabasefunction'
import { useSession } from 'next-auth/react'
import { type } from 'os'
import React, { useEffect, useState } from 'react'

function SupabasePage() {

    const {data: session, status} = useSession()

    const [todoData, setTodoData] = useState<string[]>([])

    useEffect(() => {
        const getTodos = async () => {
            const todos = await getAllTodos()
            console.log("todos_use client", todos)
            // setTodoData(todos)
        }
        getTodos()
    }, [])
    
    const handleConsole = () => {
        if (session && session.expires) {
            console.log("session.expires_type",typeof(session.expires))
            const date = new Date(session.expires)
            console.log("date", date)
            console.log("dateType",typeof(date))
        } 
    }

  return (
    <div>
        <p>SupabasePage</p>
          <div>
              {status === "loading" ? (
                  <div>Loading...</div>
              ) : <div>
                    {JSON.stringify(session, null, 2)}
                </div>
              }
        </div>
          <p>session.expires</p>
          <div>
              {status === "loading" ? (
                  <div>Loading...</div>
              ) : <div>
                    {JSON.stringify(session?.expires)}
                    <button onClick={handleConsole} className='bg-blue-200 font-semibold'>コンソール</button>
                </div>
              }
          </div>
    </div>
  )
}

export default SupabasePage