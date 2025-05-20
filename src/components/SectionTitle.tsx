import { MoveLeft, MoveRight } from 'lucide-react'
import title from '@/assets/section-title-logo.png'

interface SectionTitleProps {
    titleheading: string;
}

const SectionTitle = ({ titleheading }: SectionTitleProps) => {
    return (
        <div>

            <h2 className="text-4xl font-['Russo_One'] text-[var(--color-primary)] 
            font-bold text-center mt-4  bg-clip-text bg-gradient-to-r
              drop-shadow-md">
                {titleheading}
            </h2>

            <div className="flex justify-center mt-2 gap-2">
                <MoveLeft />
                <img src={title} alt="section-title" className="w-8 h-5" />
                <MoveRight />
            </div>
        </div>
    )
}

export default SectionTitle
