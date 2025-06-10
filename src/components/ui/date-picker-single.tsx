
"use client"

import * as React from "react"
import { format, type Locale } from "date-fns"
import { id } from 'date-fns/locale';
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DatePickerSingleProps {
  date?: Date;
  onDateChange: (date?: Date) => void;
  disabled?: (date: Date) => boolean;
  className?: string;
  popoverContentProps?: React.ComponentProps<typeof PopoverContent>;
}

export function DatePickerSingle({ 
  date, 
  onDateChange, 
  disabled, 
  className,
  popoverContentProps 
}: DatePickerSingleProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleSelect = (selectedDate?: Date) => {
    onDateChange(selectedDate);
    setIsOpen(false); // Close popover on date selection
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full md:w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP", { locale: id }) : <span>Pilih tanggal</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" {...popoverContentProps}>
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          disabled={disabled}
          initialFocus
          locale={id as Locale}
        />
      </PopoverContent>
    </Popover>
  )
}
