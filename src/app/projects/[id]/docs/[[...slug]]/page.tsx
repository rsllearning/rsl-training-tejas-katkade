import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getProjectById } from '@/lib/projects';
import { BookOpen, ChevronRight, FileText, Folder, Calendar, Terminal } from 'lucide-react';

interface DocsCatchAllProps {
  params: Promise<{
    id: string;
    slug?: string[];
  }>;
}

export default async function ProjectDocsPage({ params }: DocsCatchAllProps) {
  const { id, slug = [] } = await params;
  const project = await getProjectById(id);

  if (!project) {
    notFound();
  }

  // Construct current requested slug string: "" or "setup" or "setup/database"
  const slugPath = slug.join('/');
  const matchedDoc = project.docs[slugPath];

  // Available doc links for sidebar
  const docNavItems = [
    { slug: '', label: 'Overview & Index', path: `/projects/${id}/docs` },
    { slug: 'setup', label: 'Environment Setup', path: `/projects/${id}/docs/setup` },
    { slug: 'setup/database', label: 'Database Runbook', path: `/projects/${id}/docs/setup/database` },
    { slug: 'architecture', label: 'System Architecture', path: `/projects/${id}/docs/architecture` },
  ];

  const fullRequestedUrl = `/projects/${id}/docs${slug.length > 0 ? `/${slug.join('/')}` : ''}`;

  return (
    <div className="space-y-6">
      {/* Catch-all Path Display Breadcrumb */}
      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500">
          <Folder className="h-3.5 w-3.5 text-blue-600 mr-1" />
          <Link href={`/projects/${id}`} className="hover:text-blue-600 font-medium">
            {project.name}
          </Link>
          <ChevronRight className="h-3 w-3 text-gray-400" />
          <Link href={`/projects/${id}/docs`} className="hover:text-blue-600 font-medium">
            docs
          </Link>
          {slug.map((segment, index) => {
            const subPath = slug.slice(0, index + 1).join('/');
            const isLast = index === slug.length - 1;
            return (
              <span key={subPath} className="inline-flex items-center gap-1.5">
                <ChevronRight className="h-3 w-3 text-gray-400" />
                {isLast ? (
                  <span className="font-bold text-gray-900 bg-blue-50 text-blue-700 px-2 py-0.5 rounded">
                    {segment}
                  </span>
                ) : (
                  <Link
                    href={`/projects/${id}/docs/${subPath}`}
                    className="hover:text-blue-600 font-medium"
                  >
                    {segment}
                  </Link>
                )}
              </span>
            );
          })}
        </div>

        <div className="mt-2.5 pt-2 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
          <div className="flex items-center gap-1.5 font-mono">
            <span className="text-gray-400">Requested Resource:</span>
            <span className="text-gray-800 font-semibold">{fullRequestedUrl}</span>
          </div>
          <span className="text-gray-400">
            {slug.length === 0 ? 'Root Topic' : `${slug.length} Path ${slug.length === 1 ? 'Segment' : 'Segments'}`}
          </span>
        </div>
      </div>

      {/* Docs Layout: Sidebar & Content */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Docs Navigation Sidebar */}
        <div className="md:col-span-1 space-y-4">
          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3 flex items-center gap-1.5">
              <BookOpen className="h-4 w-4 text-blue-600" />
              <span>Project Guides</span>
            </h3>
            <nav className="space-y-1">
              {docNavItems.map((item) => {
                const isActive = slugPath === item.slug;
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium transition ${
                      isActive
                        ? 'bg-blue-50 text-blue-700 font-bold'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <FileText className={`h-3.5 w-3.5 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                    <span className="truncate">{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Documentation Content Viewer */}
        <div className="md:col-span-3">
          <div className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm space-y-6">
            {matchedDoc ? (
              <>
                <div className="border-b border-gray-100 pb-5">
                  <div className="flex items-center gap-2 text-xs text-blue-600 font-medium mb-1">
                    <Terminal className="h-3.5 w-3.5" />
                    <span>Technical Reference Specification</span>
                  </div>
                  <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
                    {matchedDoc.title}
                  </h1>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                    {matchedDoc.summary}
                  </p>
                  <div className="mt-3 flex items-center gap-2 text-[11px] text-gray-400">
                    <Calendar className="h-3 w-3" />
                    <span>Last audited: {matchedDoc.lastUpdated}</span>
                  </div>
                </div>

                <div className="prose max-w-none text-sm text-gray-700 leading-relaxed space-y-4">
                  <p>{matchedDoc.content}</p>

                  <div className="rounded-lg bg-slate-900 text-slate-100 p-4 font-mono text-xs overflow-x-auto space-y-2">
                    <div className="text-slate-400"># Verification command for {matchedDoc.title}</div>
                    <div className="text-emerald-400">
                      $ curl -s https://api.internal/projects/{id}/docs/{slugPath || 'index'} | jq .
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="py-8 text-center space-y-4">
                <FileText className="mx-auto h-12 w-12 text-gray-300" />
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Document Segment Not Found</h2>
                  <p className="text-xs text-gray-500 mt-1 max-w-md mx-auto">
                    No dedicated document was found at path <span className="font-mono text-gray-800 font-medium">/{slug.join('/')}</span>.
                    You can select one of the available guide articles from the sidebar.
                  </p>
                </div>
                <Link
                  href={`/projects/${id}/docs`}
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 transition"
                >
                  Return to Documentation Index
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
