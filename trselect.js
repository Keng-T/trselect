(function ($) {


  $.fn.trselect = function(options){

    var settings = $.extend({
      search: true,
      buttons: true,
      btn_clear_class: 'trselect-button btn btn-sm btn-danger',
      btn_all_class: 'trselect-button btn btn-sm btn-success',
      search_input_class: 'form-control input-sm',
      itemTitle: "Selected",
      showEachItem: false,
      dropdownMaxHeight: "auto",
    }, options);

    return this.each( function(){
      
      var $this = $(this),
        placeholder = $this.attr('placeholder'),
        selectclass = $this.attr('class'),
        selectstyle = $this.attr('style');

      $this.addClass("s-hidden").attr('tabindex','-1');

      var $parent = $this.parent('span');
      if($parent.length>0){
        $parent.addClass('trselect');
      }else{
        $this.wrap('<span class="trselect"></span>');
      }

      var $displaybox = $("<input> ", {
        class: 'styledSelect',
        type: 'text',
        onkeydown: 'return false',
        oncut: 'return false',
        onpaste: 'return false',
        style: selectstyle
      }).addClass(selectclass)
        .insertBefore($this)
        .on("click focus", function(){
          $displaybox.next("ul.troptions").show().focus();
        })
        .on("set_text", function(){
         
          arrText = [];
          $.each($list.find(".multiple_checkbox_style:checked"), function(){
            arrText.push($(this).next('div').text());
          });
  
          if(settings.showEachItem == true){
            $displaybox.val(arrText.join(", "));
          }else{
            $displaybox.val(arrText.length + " " + settings.itemTitle);
          }
  
          if (arrText.length == 0){
            $displaybox
              .val("")
              .attr("placeholder", placeholder);
          }

        });
    
      var $list = $("<ul>", {
        class: "troptions",
        tabindex: -1
      }).insertAfter($displaybox)
      .on("focusout",function(e){
        if (this.contains(e.relatedTarget)) return;
        $(this).hide();
      });
      $list.hide();

      function $checkItems(){
        return $list.find(".multiple_checkbox_style");
      }

      var $divSearch = $("<div> ", {
        class: "divSearchtrselect",
      }).appendTo($list);
      if (settings.search == false) {
        $divSearch.hide();
      }

      var $divoptions = $("<div> ", {
        class: "divOptionsesySelect",
      }).appendTo($divSearch);
      if (settings.buttons == false) {
        $divoptions.hide();
      }

      var $clearAll = $("<button>", {
        type: "button",
        class: settings.btn_clear_class,
        text: "Clear All",
      }).appendTo($divoptions)
        .click(function(){
          $checkItems().prop("checked", false);
          $this.children("option").prop("selected", false);
          $displaybox.trigger("set_text");
        });

      var $selectAll = $("<button>", {
        type: "button",
        class: settings.btn_all_class,
        text: "Select All",
      }).appendTo($divoptions)
        .click(function(){
          $checkItems().prop("checked", true);
          $this.children("option").prop("selected", true);
          $displaybox.trigger("set_text");
        });

      var $block = $("<li> ", {
        class: "no_results",
        text: "No results found..",
      }).appendTo($list);
      $block.hide();

      var $searchInput = $("<input> ", {
        type: "text",
        class: settings.search_input_class,
        placeholder: "Search...",
      }).appendTo($divSearch)
        .on("keyup", function(){
          var val = $(this).val().toLowerCase();
          var isMatch = false;
          $list.find(".trcontainer-item").each(function(){
            if($(this).children('div').text().toLowerCase().indexOf(val) == -1) {
              $(this).hide();
            }else{
              isMatch = true;
              $(this).show();
            }
          });
          $block.toggle(!isMatch);
        });

      var $scrolableDiv = $("<div> ", {
        class: "scrolableDiv",
      }).css("max-height", settings.dropdownMaxHeight).appendTo($list);


      $this.on("change", function(){

        $checkItems().each(function(){
          $(this).prop("checked", $this.find(`option[value="${$(this).val()}"]`).is(":selected"));
        });

        $displaybox.trigger("set_text");

      }).on("load", function(){

        $scrolableDiv.empty();

        $this.children("option").each(function(){
          
          var $li = $("<li>")
            .appendTo($scrolableDiv);

          var $option = $(this);
    
          var $label = $("<label>", {
            class: "trcontainer-item",
          }).appendTo($li);
    
          $("<div>", {
            text: $(this).text(),
          }).appendTo($label);
    
          var $checkbox = $("<input> ", {
            class: "multiple_checkbox_style",
            type: "checkbox",
            checked: $option.is(":selected"),
            value: $option.val(),
          }).prependTo($label)
            .on("change", function(){
              $option.prop("selected", $checkbox.is(":checked"));
              $displaybox.trigger("set_text");
            });

        });
    
        $this.change();
       
      });

      $this.load();

    });
  }

})(jQuery);
