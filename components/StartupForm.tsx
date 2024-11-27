'use client';

import React, { useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { Send } from 'lucide-react';
import { useActionState } from 'react';
import { formSchema } from '@/lib/validation';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

const StartupForm = () => {
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [pitch, setPitch] = useState('');
    const { toast } = useToast();
    const router = useRouter();

    const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
      const formValues = {
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        category: formData.get('category') as string,
        link: formData.get('link') as string,
        pitch,
      };

      
      console.log('Retrieved form values:', formValues);
  
        console.log(formValues);
            
            // const result = await createIdea(prevState,formData,pitch)
            // console.log(result)
            // if(result.status === "SUCCESS"){
            //     toast({
            //         title:"Success",
            //         description:"Your startup pitch is created",

            //     })
            //     router.push(`/startup/${result.id}`)
            // }

            // return result

        } catch (error) {
            if (error instanceof z.ZodError) {
              const fieldErrors = error.flatten().fieldErrors;
              setErrors(fieldErrors as unknown as Record<string, string>);
              toast({
                title: 'Error',
                description: 'Please check your inputs and try again.',
                variant: 'destructive',
              });
              return { ...prevState, error: 'Validation failed', status: 'ERROR' };
            }
          }
      
          toast({
            title: 'Error',
            description: 'An unexpected error has occurred.',
            variant: 'destructive',
          });
          return {
            ...prevState,
            error: 'An unexpected error has occurred.',
            status: 'ERROR',
          };
        };
      
        const [state, formAction, isPending] = useActionState(handleFormSubmit, {
          error: '',
          status: 'INITIAL',
        });
    return (
        <form
        action={formAction}
        className="startup-form space-y-6 bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto"
      >
        <div className="form-group">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Title
          </label>
          <input
            id="title"
            type="text"
            name="title"
            className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
            placeholder="Startup title"
          />
          {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title}</p>}
        </div>
  
        <div className="form-group">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
            placeholder="Startup description"
          />
          {errors.description && <p className="text-red-600 text-sm mt-1">{errors.description}</p>}
        </div>
  
        <div className="form-group">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <input
            id="category"
            type="text"
            name="category"
            className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
            placeholder="Startup category (e.g., Tech, Health, Education)"
          />
          {errors.category && <p className="text-red-600 text-sm mt-1">{errors.category}</p>}
        </div>
  
        <div className="form-group">
          <label htmlFor="link" className="block text-sm font-medium text-gray-700 mb-2">
            Image URL
          </label>
          <input
            id="link"
            type="text"
            name="link"
            className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
            placeholder="Startup image URL"
          />
          {errors.link && <p className="text-red-600 text-sm mt-1">{errors.link}</p>}
        </div>
  
        <div className="form-group" data-color-mode="light">
          <label htmlFor="pitch" className="block text-sm font-medium text-gray-700 mb-2">
            Pitch
          </label>
          <MDEditor
            value={pitch}
            onChange={(value) => setPitch(value as string)}
            id="pitch"
            preview="edit"
            height={300}
            style={{ borderRadius: 20, overflow: 'hidden' }}
            textareaProps={{
              placeholder: 'Briefly describe your idea and what it solves',
            }}
            previewOptions={{
              disallowedElements: ['style'],
            }}
          />
          {errors.pitch && <p className="text-red-600 text-sm mt-1">{errors.pitch}</p>}
        </div>
  
        <button
          type="submit"
          className={`flex items-center justify-center px-6 py-3 text-white font-medium rounded-lg shadow-md transition ${
            isPending
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1'
          }`}
          disabled={isPending}
        >
          {isPending ? 'Submitting...' : 'Submit Your Pitch'}
          <Send className="ml-2" />
        </button>
      </form>
    );
  };
  
  export default StartupForm;
