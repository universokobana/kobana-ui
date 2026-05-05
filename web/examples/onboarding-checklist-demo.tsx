import {
  Building2,
  CreditCard,
  FileText,
  Settings,
  UserPlus,
} from 'lucide-react'

const tasks = [
  {
    id: 'company',
    icon: <Building2 className="h-4 w-4" />,
    label: 'Preencher dados da empresa',
    completed: true,
  },
  {
    id: 'bank',
    icon: <CreditCard className="h-4 w-4" />,
    label: 'Cadastrar conta bancária',
    completed: true,
  },
  {
    id: 'charge',
    icon: <FileText className="h-4 w-4" />,
    label: 'Criar primeira cobrança',
    completed: false,
    href: '#',
  },
  {
    id: 'team',
    icon: <UserPlus className="h-4 w-4" />,
    label: 'Convidar membros da equipe',
    completed: false,
    href: '#',
  },
  {
    id: 'settings',
    icon: <Settings className="h-4 w-4" />,
    label: 'Personalizar configurações',
    completed: false,
    href: '#',
  },
]

export default function OnboardingChecklistDemo() {
  return (
    <div className="mx-auto flex w-full max-w-xl flex-col items-center">
      <div className="mb-6 text-center">
        <h2 className="text-xl font-semibold tracking-tight">
          Configure sua conta
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Complete as etapas abaixo para começar a usar o sistema.
        </p>
        <p className="mt-2 text-sm text-muted-foreground">2 de 5 concluídas</p>
      </div>

      <div className="w-full rounded-lg border">
        {tasks.map((task, index) => (
          <div key={task.id}>
            {index > 0 && <div className="border-t" />}
            <div className="flex w-full items-center gap-3 px-4 py-3">
              <span className="flex shrink-0 items-center text-muted-foreground">
                {task.icon}
              </span>
              <span
                className={`flex-1 text-left text-sm ${task.completed ? 'text-muted-foreground line-through' : ''}`}
              >
                {task.label}
              </span>
              <span className="flex shrink-0 items-center">
                {task.completed ? (
                  <svg
                    className="h-5 w-5 text-status-success"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  <svg
                    className="h-5 w-5 text-muted-foreground/40"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                )}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-center text-sm text-muted-foreground">
        Precisa de ajuda?{' '}
        <a href="#" className="text-primary hover:underline">
          Acesse nossa Central de Ajuda.
        </a>
      </div>
    </div>
  )
}
