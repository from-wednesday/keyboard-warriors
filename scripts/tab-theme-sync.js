/* ══════════════════════════════════════════════════════════════
   Keyboard Warriors — Documentation Theme Sync
   Include this on any subpage under /documentation/pages/ that
   uses a light/dark-aware style, such as .h1-alt in
   documentation_design-system.css.

   The parent tab stack reads the system's light/dark preference
   once, when the page first loads, and never checks again, so the
   whole stack stays in sync even if the system theme changes while
   the page is open. A subpage using its own live
   @media (prefers-color-scheme: dark) query would fall out of sync
   with that, updating instantly while everything else waits for a
   reload. This script keeps this page on the same one-time snapshot
   the parent already uses, by copying the parent's theme onto this
   page's own <html> element as a data-theme attribute, for CSS to
   select against instead.
   ══════════════════════════════════════════════════════════════ */
(function(){
  function parentController(){
    try{
      if(window.parent && window.parent !== window && window.parent.DocumentationTabController){
        return window.parent.DocumentationTabController;
      }
    }catch(e){}
    return null;
  }

  var controller = parentController();
  var theme = controller
    ? controller.theme
    : (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

  document.documentElement.dataset.theme = theme;
})();
