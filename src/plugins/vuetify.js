import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

import 'vuetify/styles'

export default createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        dark: false,
        colors: {
          primary: '#f3f6f9',       
          secondary: '#42A5F5',     
          accent: '#7CB342',        
          warning: '#FFA726',       
          error: '#EF5350',         
          info: '#7E57C2',          
          success: '#66BB6A',       
          background: '#ffffff',    
          surface: '#ffffff'
        },
      },
       dark: {
        dark: true,
        colors: {
          primary: '#121212',
          background: '#1e1e1e',
          surface: '#1e1e1e',
          secondary: '#2a2a2a',
          error: '#cf6679',
          success: '#4caf50',
          warning: '#ff9800',
          info: '#2196f3',
          onBackground: '#ffffff',
          onSurface: '#eeeeee'
        },
      },
    },
  },
})

