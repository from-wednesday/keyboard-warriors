/* ══════════════════════════════════════════════════════════════
   Keyboard Warriors — Documentation Tab Links
   Include this on any subpage under /documentation/pages/ that
   needs working in-page anchors, a link that switches to a
   different tab, or both.

   In-page anchors: a plain <a href="#some-id"> is intercepted and
   asks the parent tab stack to smoothly scroll this tab's own
   scroll area to that element, instead of the browser's native
   anchor jump, which fights the tab stack's custom scrolling.

   Cross-tab links: any link carrying a data-open-tab attribute is
   intercepted and asks the parent tab stack to switch to the named
   tab. The value can be a tab's objectId or its label, exactly as
   written in the manifest (to-public.json etc). Give the link a
   real href too, e.g. href="../?tab=5", so it still works if the
   page is ever opened on its own, outside the tab stack.
   ══════════════════════════════════════════════════════════════ */
(function(){
  function tabController(){
    try{
      if(window.parent && window.parent !== window && window.parent.DocumentationTabController){
        return window.parent.DocumentationTabController;
      }
    }catch(e){}
    return null;
  }

  // Small gap left above a scrolled-to heading so it doesn't land
  // flush against the very top edge of the visible tab area.
  var anchorScrollTopMarginPx = 16;

  document.addEventListener('click', function(clickEvent){
    var linkElement = clickEvent.target.closest('a');
    if(!linkElement) return;

    var controller = tabController();
    if(!controller) return; // page opened on its own: let normal link behaviour happen

    var openTabIdentifier = linkElement.getAttribute('data-open-tab');
    if(openTabIdentifier !== null){
      clickEvent.preventDefault();
      controller.switchToTab(openTabIdentifier);
      return;
    }

    var href = linkElement.getAttribute('href') || '';
    if(href.charAt(0) !== '#' || href.length < 2) return;
    var targetElement = document.getElementById(href.slice(1));
    if(!targetElement) return;

    clickEvent.preventDefault();
    var targetOffsetY = targetElement.getBoundingClientRect().top + window.scrollY - anchorScrollTopMarginPx;
    controller.scrollActiveFrameTo(targetOffsetY);
  });
})();
