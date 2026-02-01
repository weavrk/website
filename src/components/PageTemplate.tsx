import React from 'react';
import PageShell from './PageShell';

interface ContentTemplateProps {
  children: React.ReactNode;
  usePageShell?: boolean;
  pageShellClassName?: string;
  showMobileHeader?: boolean;
  mobileHeaderText?: string;
}

const ContentTemplate: React.FC<ContentTemplateProps> = ({ 
  children, 
  usePageShell = true, 
  pageShellClassName = '',
  showMobileHeader = true,
  mobileHeaderText
}) => {
  return (
    <>
      {showMobileHeader && mobileHeaderText && (
        <div className="md:hidden mobile-header-shell">
          <p className="mobile-header text-lg font-semibold px-6 py-4">{mobileHeaderText}</p>
        </div>
      )}

      {usePageShell ? (
        <PageShell className={pageShellClassName}>
          {children}
        </PageShell>
      ) : (
        children
      )}
    </>
  );
};

export default ContentTemplate; 