"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { toast } from "@/components/ui/use-toast"
import { ScrollArea } from "../ui/scroll-area"
import { tags } from "@/constants/data";

export function BlogTags({ form }:any) {

  return (
    <ScrollArea className="h-[350px]">
      <Form {...form}>
        <form className="space-y-8">
            <FormField
              control={form.control}
              name="items"
              render={() => (
                  <FormItem>
                  {tags.map((item: typeof tags[0], index: number) => (
                    <div key={index}>
                      <span className="text-md font-semibold">{item.title}</span>
                      {item.points.map( point => (
                        <FormField
                        key={point}
                        control={form.control}
                        name="items"
                        render={({ field }) => {
                            return (
                            <FormItem
                                key={point}
                                className="flex flex-row items-start space-x-3 space-y-1"
                            >
                                <FormControl>
                                <Checkbox
                                    checked={field.value?.includes(point)}
                                    onCheckedChange={(checked) => {
                                    return checked
                                        ? field.onChange([...field.value, point])
                                        : field.onChange(
                                            field.value?.filter(
                                            (value: string) => value !== point
                                            )
                                        )
                                    }}
                                />
                                </FormControl>
                                <FormLabel className="font-normal m-0">
                                {point}
                                </FormLabel>
                            </FormItem>
                            )
                        }}
                        />
                      ))}
                    </div>
                  ))}
                  <FormMessage />
                  </FormItem>
              )}
            />
        </form>
      </Form>
    </ScrollArea>
  )
}

