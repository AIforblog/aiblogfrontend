"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { ReactNode } from "react";
import Image from "next/image";
import { FormFieldType } from "@/types/form-types";
import CalendarIcon from "@/public/assets/icons/calendar-icon.svg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "@/app/globals.css";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CustomProps {
  control: Control<any>;
  fieldType: FormFieldType;
  name: string;
  label?: string;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: ReactNode;
  renderSkeleton?: (field: any) => ReactNode;
  hasBorder?: boolean;
  formatNumberValue?: (value: string) => string;
}

interface RenderFieldProps {
  field: any;
  props: CustomProps;
}

const RenderField: React.FC<RenderFieldProps> = ({ field, props }) => {
  const {
    fieldType,
    disabled,
    iconSrc,
    iconAlt,
    placeholder,
    hasBorder,
    dateFormat,
    formatNumberValue,
  } = props;

  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value.replace(/,/g, "");
    const numericValue = parseFloat(rawValue);
    if (rawValue === "" || rawValue === placeholder) {
      field.onChange("");
    } else if (!isNaN(numericValue)) {
      field.onChange(numericValue);
    } else {
      field.onChange("");
    }

    if (formatNumberValue) {
      const formattedValue = formatNumberValue(rawValue);
      event.target.value = formattedValue;
    }
  };

  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="h-12 flex border border-[#f5f5f5] md:border-[#e5e5e5] rounded-[8px] bg-white overflow-hidden">
          {typeof iconSrc === "string" ? (
            <Image
              src={iconSrc}
              height={24}
              width={24}
              alt={iconAlt || "icon"}
            />
          ) : (
            iconSrc
          )}

          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              className="flex w-full h-full text-[#404040] font-normal border-0 bg-transparent text-sm md:text-base placeholder:font-normal placeholder:text-sm md:placeholder:text-base placeholder:text-[#a3a3a3]"
            />
          </FormControl>
        </div>
      );

    case FormFieldType.NUMBER:
      return (
        <div className="h-12 flex border border-[#f5f5f5] md:border-[#e5e5e5] rounded-[8px] bg-white overflow-hidden">
          <FormControl>
            <Input
              type="number"
              placeholder={placeholder}
              {...field}
              className="flex w-full h-full text-[#404040] font-normal border-0 bg-transparent text-sm md:text-base placeholder:font-normal placeholder:text-sm md:placeholder:text-base placeholder:text-[#a3a3a3]"
              onWheel={(e) => e.currentTarget.blur()}
              min={0}
              inputMode="numeric"
              onChange={handleNumberChange}
            />
          </FormControl>
        </div>
      );

    case FormFieldType.TEXTAREA:
      return (
        <FormControl>
          <textarea
            placeholder={placeholder}
            {...field}
            disabled={disabled}
            autoFocus={false}
            className="w-full px-3 py-2 flex min-h-[9rem] max-h-full border border-[#f5f5f5] focus-within:outline-0 md:border-[#e5e5e5] rounded-[8px] bg-white overflow-y-auto custom-scroll resize-none  text-[#404040] font-normal text-sm md:text-base placeholder:font-normal placeholder:text-sm md:placeholder:text-base placeholder:text-[#a3a3a3]"
          />
        </FormControl>
      );

    case FormFieldType.DATE_PICKER:
      return (
        <div
          className={`h-12 flex justify-between items-center ${
            hasBorder ? "border border-[#f5f5f5]" : ""
          }  rounded-[8px] bg-white overflow-hidden px-3`}
        >
          <FormControl>
            <DatePicker
              selected={field.value ? new Date(field.value) : null}
              {...field}
              placeholderText={placeholder}
              dateFormat={dateFormat ?? "MM/dd/yyyy"}
              wrapperClassName="date-picker"
              showPopperArrow={false}
              withPortal
              popperPlacement="bottom-start"
              focusSelectedMonth
              showDateSelect
              shouldCloseOnSelect
              className="flex-1 cursor-pointer w-full h-full text-[#404040] font-normal border-0 bg-transparent text-sm md:text-base placeholder:font-normal placeholder:text-sm md:placeholder:text-base placeholder:text-[#a3a3a3] focus-within:outline-none"
              calendarClassName="bg-white/85 rounded-2xl overflow-hidden border-0"
            />
          </FormControl>

          <Image
            src={CalendarIcon}
            alt={iconAlt || "icon"}
            className="w-4 h-4 md:w-[18px] md:[18px]"
          />
        </div>
      );

    case FormFieldType.SELECT:
      return (
        <FormControl>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger
                autoFocus={false}
                className={`h-12 flex text-[#a3a3a3] text-sm md:text-base placeholder:font-normal placeholder:text-sm md:placeholder:text-base placeholder:text-[#a3a3a3] border-[#f5f5f5] md:border-[#e5e5e5] focus-within:outline-0 rounded-[8px] bg-white overflow-hidden`}
              >
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>

            <SelectContent className="bg-white">{props.children}</SelectContent>
          </Select>
        </FormControl>
      );
    default:
      break;
  }
};

const CustomFormField = (props: CustomProps) => {
  const { control, fieldType, label, name } = props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          {fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel className="text-sm md:text-base font-normal text-[#171717] capitalize">
              {label}
            </FormLabel>
          )}

          <RenderField field={field} props={props} />

          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  );
};

{
  /* <FormItem>
          <FormLabel>Username</FormLabel>
          <FormControl>
            <Input placeholder="shadcn" {...field} />
          </FormControl>
          <FormDescription>This is your public display name.</FormDescription>
          <FormMessage />
        </FormItem> */
}

export default CustomFormField;
