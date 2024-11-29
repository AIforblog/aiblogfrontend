'use client'

import { useState } from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'
import { RoundedImage } from "@/components/shared/rounded-image"

const Modal = ({ isOpen, onClose, imageSrc }: {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center" onClick={onClose}>
      <div className="relative max-w-3xl max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
        <button
          className="absolute top-2 right-2 text-white bg-black bg-opacity-50 rounded-full p-2"
          onClick={onClose}
        >
          <X size={24} />
        </button>
        <Image src={imageSrc} width={1000} height={1000} alt="Full size profile" className="max-w-full max-h-[90vh] object-contain" />
      </div>
    </div>
  )
}

export default function ProfileImageModal({ profileImageSrc }: { profileImageSrc: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <button className="relative" onClick={() => setIsModalOpen(true)}>
        <RoundedImage
          size={120}
          src={profileImageSrc}
          alt={`profile pic`}
          className="border-4 border-white cursor-pointer"
        />
      </button>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        imageSrc={profileImageSrc}
      />
    </>
  )
}