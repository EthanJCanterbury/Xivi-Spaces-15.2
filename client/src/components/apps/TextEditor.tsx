import { useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Save } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface TextEditorProps {
  path?: string[];
}

export function TextEditor({ path }: TextEditorProps) {
  const [content, setContent] = useState('Welcome to Notepad!\nFile system is currently in demo mode.')
  const { toast } = useToast()

  const handleSave = () => {
    toast({
      title: "Demo Mode",
      description: "File system is currently in demo mode. Changes won't be saved.",
    });
  }

  return (
    <div className="h-full flex flex-col bg-background">
      <div className="p-3 border-b bg-muted/30 flex items-center justify-between">
        <Button 
          size="sm" 
          variant="outline"
          className="hover:bg-primary hover:text-primary-foreground transition-colors"
          onClick={handleSave}
        >
          <Save className="h-4 w-4 mr-2" />
          Save
        </Button>
      </div>
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Start typing..."
        className="flex-1 resize-none rounded-none border-0 bg-background font-mono text-sm leading-relaxed focus:ring-0"
        style={{
          fontFamily: '"JetBrains Mono", "Fira Code", "Cascadia Code", monospace'
        }}
      />
    </div>
  )
}