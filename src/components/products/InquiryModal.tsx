import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Product } from '../../types/product';

interface InquiryModalProps {
   product: Product | null;
   isOpen: boolean;
   onClose: () => void;
}

export default function InquiryModal({ product, isOpen, onClose }: InquiryModalProps) {
   const [formData, setFormData] = useState({
     name: '',
     email: '',
     phone: '',
     quantity: '1',
     message: '',
   });
   const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
   const [error, setError] = useState<string | null>(null);
   const [selectedOption, setSelectedOption] = useState<'gold' | 'purple' | 'green'>(() => {
     if (!product) return 'gold';
     const name = product.name.toLowerCase();
    return name.includes('purple') ? 'purple' : 
           name.includes('green') ? 'green' : 'gold';
   });

  React.useEffect(() => {
    if (product) {
      const name = product.name.toLowerCase();
      setSelectedOption(
        name.includes('purple') ? 'purple' : 
        name.includes('green') ? 'green' : 'gold'
      );
    }
  }, [product]);

   const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault();
     setStatus('submitting');
     setError(null);

     try {
       const response = await fetch('/', {
         method: 'POST',
         headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
         body: new URLSearchParams({
           'form-name': 'product-inquiry',
           ...formData,
           product: `${product?.name} (${selectedOption.charAt(0).toUpperCase() + selectedOption.slice(1)})`,
           quantity: formData.quantity,
         }).toString(),
       });

       if (response.ok) {
         setStatus('success');
         setFormData({ name: '', email: '', phone: '', quantity: '1', message: '' });
       } else {
         throw new Error('Failed to submit form');
       }
     } catch (err) {
       setStatus('error');
       setError('Failed to submit form. Please try again.');
     }
   };

   if (!product) return null;

   const getImageForOption = (option: string) => {
     switch(option) {
       case 'purple':
         return 'https://static.wixstatic.com/media/c73eb8_c1d98f4536ee459bb2aa8b985a406a8c~mv2.jpg';
       case 'green':
         return 'https://static.wixstatic.com/media/c73eb8_8a88b2b0d0c7480ea872e6f743976bff~mv2.jpg';
       default:
         return 'https://static.wixstatic.com/media/c73eb8_ff7f66e9507641faa38814ee86fc103b~mv2.jpg';
     }
   };

   return (
     <div className="fixed inset-0 z-50 overflow-y-auto">
       <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose} />
       
       <div className="flex min-h-screen items-center justify-center p-4">
         <div className="relative w-full max-w-2xl rounded-lg bg-white shadow-xl">
           <div className="flex items-center justify-between p-6 border-b border-gray-200">
             <h2 className="text-2xl font-bold text-gray-900">
              Inquire About {selectedOption.charAt(0).toUpperCase() + selectedOption.slice(1)} {product.name}
             </h2>
             <button
               onClick={onClose}
               className="text-gray-400 hover:text-gray-500"
             >
               <X className="h-6 w-6" />
             </button>
           </div>
           
           <div className="p-6">
             <div className="mb-6">
               <img
                 src={getImageForOption(selectedOption)}
                alt={`${selectedOption.charAt(0).toUpperCase() + selectedOption.slice(1)} Sea Moss`}
                 className="w-full h-64 object-cover rounded-lg"
               />
             </div>

             <form
               name="product-inquiry"
               method="POST"
               data-netlify="true"
               onSubmit={handleSubmit}
               className="space-y-6"
             >
               <input type="hidden" name="form-name" value="product-inquiry" />
               <input type="hidden" name="product" value={product.name} />

               <div className="space-y-2 text-left">
                 <label className="block text-sm font-medium text-gray-700">
                   Select Option *
                 </label>
                 <div className="grid grid-cols-3 gap-3">
                   {['gold', 'purple', 'green'].map((option) => (
                     <button
                       key={option}
                       type="button"
                       onClick={() => setSelectedOption(option as 'gold' | 'purple' | 'green')}
                       className={`px-3 py-2 text-sm font-medium rounded-md ${
                         selectedOption === option
                           ? 'bg-amber-600 text-white'
                           : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                       }`}
                     >
                       {option.charAt(0).toUpperCase() + option.slice(1)}
                     </button>
                   ))}
                 </div>
               </div>

               <div className="text-left">
                 <label className="block text-sm font-medium text-gray-700 mb-1">
                   Quantity *
                 </label>
                 <select
                   name="quantity"
                   value={formData.quantity}
                   onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                   className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                 >
                   {[1, 2, 3, 4, 5].map((num) => (
                     <option key={num} value={num}>{num}</option>
                   ))}
                 </select>
               </div>

               <div className="text-left">
                 <label className="block text-sm font-medium text-gray-700 mb-1">
                   Name *
                 </label>
                 <input
                   type="text"
                   name="name"
                   value={formData.name}
                   onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                   required
                   className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                 />
               </div>

               <div className="text-left">
                 <label className="block text-sm font-medium text-gray-700 mb-1">
                   Email *
                 </label>
                 <input
                   type="email"
                   name="email"
                   value={formData.email}
                   onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                   required
                   className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                 />
               </div>

               <div className="text-left">
                 <label className="block text-sm font-medium text-gray-700 mb-1">
                   Phone
                 </label>
                 <input
                   type="tel"
                   name="phone"
                   value={formData.phone}
                   onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                   className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                 />
               </div>

               <div className="text-left">
                 <label className="block text-sm font-medium text-gray-700 mb-1">
                   Message
                 </label>
                 <textarea
                   name="message"
                   value={formData.message}
                   onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                   rows={4}
                   className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
                 />
               </div>

               <button
                 type="submit"
                 disabled={status === 'submitting'}
                 className="w-full mt-6 px-6 py-3 bg-amber-600 text-white rounded-md hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50"
               >
                 {status === 'submitting' ? 'Sending...' : 'Send Inquiry'}
               </button>

               {status === 'success' && (
                 <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md text-green-700">
                   Thank you for your inquiry! We'll get back to you soon.
                 </div>
               )}

               {status === 'error' && error && (
                 <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md text-red-700">
                   {error}
                 </div>
               )}
             </form>
           </div>
         </div>
       </div>
     </div>
   );
}