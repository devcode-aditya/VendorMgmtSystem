import VendorRegistration from './vendorRegistration';

export default function VendorRegistrationPage() {
    return (
        <main className="min-h-[80vh] px-4">
            <section className="mx-auto max-w-3xl pt-10 text-center">
                <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">Vendor Registration</h1>
                <p className="mt-2 text-zinc-600 dark:text-zinc-400">Join our network by submitting your business details below.</p>
            </section>
            <section className="mx-auto max-w-3xl">
                <VendorRegistration />
            </section>
        </main>
    );
}