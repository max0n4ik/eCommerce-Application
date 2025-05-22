import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import { useFormStatus } from 'react-dom';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface BirthdayCalendarProps {
  name: string;
  defaultValue?: Date | null;
  required?: boolean;
  onChange: (date: Date | null) => void;
}

export function BirthdayCalendar({
  name,
  defaultValue = null,
  required = false,
  onChange,
}: BirthdayCalendarProps): React.JSX.Element {
  const { pending } = useFormStatus();
  const [date, setDate] = useState<Date | null>(defaultValue);
  const handleSelect = (day: Date | null = null): void => {
    setDate(day);
    onChange(day);
  };
  return (
    <div className="flex flex-col">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={'outline'}
            className={cn(
              'w-full pl-3 text-left hover:bg-muted hover:text-muted-foreground placeholder:text-muted-foreground',
              !date && 'text-muted-foreground'
            )}
            disabled={pending}
          >
            {date ? format(date, 'PPP') : <span>Birthday</span>}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            captionLayout="dropdown"
            mode="single"
            selected={date ?? undefined}
            onSelect={handleSelect}
            disabled={(date: Date) =>
              date > new Date() || date < new Date('1900-01-01')
            }
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <input
        type="hidden"
        name={name}
        value={date?.toISOString() || ''}
        required={required}
      />
    </div>
  );
}
