"use server"
// import { supabase, supabase2 } from "./supabase"
import {supabase2 } from "./supabase"


export const getAllTodos = async () => {
    // //見本
    // const todos = await supabase.from("todo").select("*")
    // console.log("todos",todos)
    // return todos.data


    ////jose
    const supabase2Alpha = await supabase2()
    const todos2 = await supabase2Alpha.from("users").select("*")
    return todos2
}