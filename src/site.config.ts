/** Edit these to connect the site to the magazine's real inbox. */
export const site = {
  name: 'ink & young',
  /** Where submissions and questions go. */
  email: 'katki@inkandyoung.example',
  contactEmail: 'merhaba@inkandyoung.example',
  /**
   * Optional form endpoint (Formspree, Getform, your own API…) that accepts a
   * multipart POST. Leave empty and the form opens the visitor's email app instead.
   */
  formEndpoint: import.meta.env.PUBLIC_FORM_ENDPOINT ?? '',
  instagram: 'https://instagram.com/',
};
