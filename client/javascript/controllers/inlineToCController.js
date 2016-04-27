angular.module('meanstacktutorials').controller('InlineToCController', [
  '$scope',
  function ($scope) {
    $scope.tocItems = {
      "Shakespeare Stories": {
        lead: true,
        sub: {
          "Hamlet": {
            link: "hamlet",
            isInternalLink: true,
            // No need for icons, but if you want to add one here it is:
            // No need for sub sub links but an example of doing that is provided:
            subsub: {
              "Sub Sub Link": {
                link: "subsub",
                isInternalLink: true,
            // Glyphicons from Twitter Bootstrap may be used. Here's an example.
            glyphicon: "glyphicon glyphicon-star"
                
              }
            },
            "Romeo & Juliet": {
              link: "romeojuliet",
              isInternalLink: true,
              icon: "II"
            }
          }
        }
      },
      "Famous Greeks": {
        lead: true,
        sub: {
          "Socrates": {
            link: "socrates",
            isInternalLink: true,
            icon: "I"            
          },
          "Plato": {
            link: "plato",
            isInternalLink: true,
            icon: "II"                        
          },
          "Aristotle": {
            link: "aristotle",
            isInternalLink: true,
            icon: "III"                                                
          },
          "Epicurus": {
            link: "epicurus",
            isInternalLink: true,
            icon: "IV"                                                            
          }
        }
      }
    };
  }
]);