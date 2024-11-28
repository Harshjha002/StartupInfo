'use client';

import React, { useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { Send } from 'lucide-react';
import { useActionState } from 'react';
import { formSchema } from '@/lib/validation';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { createPitch } from '@/lib/action';

const StartupForm = () => {
  const [errors, setErrors] = useState({
    title: '',
    description: '',
    category: '',
    link: '',
    pitch: '',
  });
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

      await formSchema.parseAsync(formValues);

      const result = await createPitch(prevState, formData, pitch);
      if (result) {
        toast({
          title: 'Success',
          description: 'Your startup pitch has been created successfully.',
        });

        router.push(`/startup/${result._id}`);
      }

      return result;
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

      toast({
        title: 'Error',
        description: 'An unexpected error occurred. Please try again later.',
        variant: 'destructive',
      });
      return {
        ...prevState,
        error: 'An unexpected error occurred.',
        status: 'ERROR',
      };
    }
  };

  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: '',
    status: 'INITIAL',
  });

  return (
    <form
      action={formAction}
      className="startup-form bg-gradient-to-r from-gray-50 to-gray-100 p-8 rounded-xl shadow-lg max-w-2xl mx-auto space-y-8"
    >
      {/** Form Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800">Create Your Startup Pitch</h1>
        <p className="text-gray-500 mt-2">
          Share your startup idea and attract the attention it deserves.
        </p>
      </div>

      {/** Title Input */}
      <div className="form-group space-y-2">
        <label htmlFor="title" className="block text-sm font-semibold text-gray-700">
          Title
        </label>
        <input
          id="title"
          type="text"
          name="title"
          className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 bg-white shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
          required
          placeholder="Enter the title of your startup"
        />
        {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
      </div>

      {/** Description Input */}
      <div className="form-group space-y-2">
        <label
          htmlFor="description"
          className="block text-sm font-semibold text-gray-700"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 bg-white shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
          required
          placeholder="Provide a short description of your startup"
        />
        {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
      </div>

      {/** Category Input */}
      <div className="form-group space-y-2">
        <label htmlFor="category" className="block text-sm font-semibold text-gray-700">
          Category
        </label>
        <input
          id="category"
          type="text"
          name="category"
          className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 bg-white shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
          required
          placeholder="e.g., Tech, Health, Education"
        />
        {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
      </div>

      {/** Image URL Input */}
      <div className="form-group space-y-2">
        <label htmlFor="link" className="block text-sm font-semibold text-gray-700">
          Image URL
        </label>
        <input
          id="link"
          type="text"
          name="link"
          className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 bg-white shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
          required
          placeholder="Provide an image URL for your startup"
        />
        {errors.link && <p className="text-red-500 text-sm">{errors.link}</p>}
      </div>

      {/** Pitch Editor */}
      <div className="form-group" data-color-mode="light">
        <label htmlFor="pitch" className="block text-sm font-semibold text-gray-700 mb-2">
          Pitch
        </label>
        <MDEditor
          value={pitch}
          onChange={(value) => setPitch(value as string)}
          id="pitch"
          preview="edit"
          height={300}
          className="border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
          textareaProps={{
            placeholder: 'Describe your idea and its impact.',
          }}
          previewOptions={{
            disallowedElements: ['style'],
          }}
        />
        {errors.pitch && <p className="text-red-500 text-sm mt-1">{errors.pitch}</p>}
      </div>

      {/** Submit Button */}
      <button
        type="submit"
        className={`flex items-center justify-center w-full px-6 py-3 text-white font-medium rounded-lg shadow-md transition ${
          isPending
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:ring-offset-1'
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
