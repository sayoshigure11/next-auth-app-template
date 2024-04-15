"use client"
import { getAllTodos } from '@/utils/supabasefunction'
import React, { useEffect, useState } from 'react'

function SupabasePage() {

    const [todoData, setTodoData] = useState<string[]>([])

    useEffect(() => {
        const getTodos = async () => {
            const todos = await getAllTodos()
            console.log("todos_use client", todos)
            // setTodoData(todos)
        }
        getTodos()
    },[])

  return (
    <div>
        <p>SupabasePage</p>
        <div></div>
    </div>
  )
}

export default SupabasePage