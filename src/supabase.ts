import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://phwsyfxtecwyqjypctlo.supabase.co'
const supabaseAnonKey = 'sb_publishable_WsZNNP5Tw_hg9G7KwCnUig_Yx5vDD2Q'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
