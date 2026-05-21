/**
 * Modern Cloudinary Configurations & Optimization Helpers
 * Leverages next-generation format conversion (AVIF/WebP) and compression for rich media (Ultra HD, 3D assets).
 */

export const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

/**
 * Optimizes an image URL by applying professional Cloudinary transformations
 * @param {string} publicId - The public ID of the uploaded asset on Cloudinary.
 * @param {object} options - Custom width, height, quality and crop transformations.
 * @returns {string} Fully optimized image URL.
 */
export function getOptimizedImage(publicId, options = {}) {
  if (!publicId) return "";
  
  // Return original if it is already a fully-qualified HTTP/HTTPS URL
  if (publicId.startsWith("http")) return publicId;

  const cloudName = CLOUDINARY_CLOUD_NAME || "xtc-lifestyle";
  const width = options.width ? `w_${options.width}` : "w_auto";
  const height = options.height ? `h_${options.height}` : "";
  const crop = options.crop ? `c_${options.crop}` : "c_limit";
  const quality = options.quality ? `q_${options.quality}` : "q_auto";
  const format = "f_auto"; // Automatically deliver modern formats like AVIF or WebP based on browser support
  
  const transformations = [width, height, crop, quality, format].filter(Boolean).join(",");
  
  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformations}/${publicId}`;
}
