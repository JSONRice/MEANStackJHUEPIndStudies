angular.module('meanstacktutorials').controller('ShowcaseModalController', [
  '$scope',
  '$uibModal',
  function ($scope, $uibModal) {

    $scope.openDinoInfo = function (size) {
      $scope.modalInstance('../../templates/showcase/modals/showcaseDinoInfo.html', size);
    };
    $scope.dinoItems = [
      {
        name: 'Velociraptor',
        description: 'Velociraptor roamed the Earth about 85.8 million to 70.6 million years ago during the end of the Cretaceous Period. In 1924, Henry Fairfield Osborn, then-president of the American Museum of Natural History, named Velociraptor. He bestowed the name on this dinosaur, which is derived from the Latin words "velox" (swift) and "raptor" (robber or plunderer), as an apt description of its agility and carnivorous diet. Earlier that year, Osborn had called the dinosaur Ovoraptor djadochtari in an article in the popular press, but the creature wasn\'t formally described in the article and the name "Ovoraptor" wasn\'t mentioned in a scientific journal, making Velociraptor the accepted name.',
        imageuri: '../../images/dinosaurs/velociraptor.jpg',
        age: 'Cretaceous Period',
        location: 'Asia',
        source: 'http://www.livescience.com/23922-velociraptor-facts.html'
      },
      {
        name: 'Stegosaurus',
        description: 'Stegosaurus was a large, plant-eating dinosaur that lived during the late Jurassic Period, about 150.8 million to 155.7 million years ago, primarily in western North America. It was about the size of a bus and carried around two rows of bony plates along its back that made it appear even bigger. Stegosaurus is a bit of media darling because there is so much material to help scientists reconstruct its distinctive appearance. It has been depicted on television and in movies, most notably chasing Faye Wray in "King Kong" and appearing in the second and third installments of the \"Jurassic Park" films. A newspaper cartoon even helped name one of its body parts. Stegosaurus has a reputation for having a small brain and one of the lowest-brain-to-body ratios among dinosaurs. "The brain of Stegosaurus was long thought to be the size of a walnut," said armored dinosaur expert Kenneth Carpenter, director of the USU Eastern Prehistoric Museum in Utah. "But actually, its brain had the size and shape of a bent hotdog."',
        imageuri: '../../images/dinosaurs/stegosaurus.jpg',
        age: 'Jurassic Period',
        location: 'North America',
        source: 'http://www.livescience.com/24184-stegosaurus-facts.html'
      },
      {
        name: 'Megalodon',
        description: 'It\'s easy to understand why Discovery chose megalodon to kick off this year\'s Shark Week, though. Growing to an estimated length of over 50 feet (16 meters), megalodon—literally "megatooth"—resembled something out of a prehistoric nightmare and has no modern equivalents in terms of size. A great white is about the size of the clasper, or penis, of a male megalodon," Peter Klimley, a shark expert at the University of California at Davis, said in a 2008 interview. Some studies suggest megalodon, which lived from about 16 million years ago until about 2 million years ago, had the most powerful bite of any creature that ever lived—strong enough to crush an automobile and far stronger than that of the great white shark or even Tyrannosaurus rex. Another example of how intimidating megalodon could be: Where modern great whites hunt dolphins, scientists think megalodon hunted whales, or at least their ancestors, by biting off their tails and flippers.',
        imageuri: '../../images/dinosaurs/megalodon.jpg',
        age: 'Early Miocene',
        location: 'Oceans of the World (coastal)',
        source: 'http://news.nationalgeographic.com/news/2013/08/130807-discovery-megalodon-shark-week-great-white-sharks-animals/'
      },
      {
        name: 'Tyrannosaurus Rex',
        description: 'The Tyrannosaurus Rex or T-Rex for short was a feared land predator that attacked nearly every herbivore in sight. Here it is pictured on the left attacking a Triceratops on the right. Aside from being one of the largest of the known carnivorous dinosaurs, Tyrannosaurus rex — T. rex, for short — is the dinosaur that has arguably received the most media exposure. It had a starring role in the "Jurassic Park" movies and has a renowned exhibit at the American Museum of Natural History in New York City. The name Tyrannosaurus rex means "king of the tyrant lizards": "tyranno" means tyrant in Greek; "saurus" means lizard in Greek, and "rex" means "king" in Latin. In 1905, Henry Fairfield Osborn, president of the American Museum of Natural History at the time, named Tyrannosaurus rex.',
        imageuri: '../../images/dinosaurs/trex.jpg',
        age: 'Late Cretaceous',
        location: 'North America',
        source: 'http://www.livescience.com/23868-tyrannosaurus-rex-facts.html'
      },
      {
        name: 'Triceratops',
        description: 'Triceratops, with its three horns and bony frill around the back of its head, is one of the most recognizable dinosaurs. Its name is a combination of the Greek syllables tri-, meaning "three," kéras, meaning "horn," and ops, meaning "face." The dinosaur roamed North America about 67 million to 65 million years ago, during the end of the Cretaceous Period. Since Triceratops\' discovery in 1887, up to 16 species of the dinosaur have been proposed, but only two species — T. horridus and T. prorsus — are currently considered valid, according to a 2014 study in the journal Proceedings of the National Academy of Sciences (PNAS), which found that T. horridus likely evolved into T. prorsus over a span of 1 million to 2 million years. ',
        imageuri: '../../images/dinosaurs/triceratops.jpg',
        age: 'Late Cretaceous',
        location: 'North America and Asia',
        source: 'http://www.livescience.com/24011-triceratops-facts.html'
      },
      {
        name: 'Troodon',
        description: 'Troodon was a crafty miniature raptor that attacked in packs. Troodon was believed to have feathers and the birds that we know today may have evolved from Troodon.',
        imageuri: '../../images/dinosaurs/troodon.jpg',
        age: 'Late Cretaceous',
        location: 'Subtropical Europe'
      }
    ];
    $scope.selectedDino = {
      item: $scope.dinoItems[0]
    };

    // indicates that user selected an item from the modal
    $scope.madeSelection = false;

    $scope.modalInstance = function (templateUrl, size) {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: templateUrl,
        controller: function ($uibModalInstance, $scope) {
          $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
          };

          $scope.ok = function () {
            // Note pass any data you wish back to the client from the modal here:      
            $uibModalInstance.close($scope.selectedDino);
          };
        },
        size: size,
        // Don't use 'this' here just use the controller $scope with all the properties
        scope: $scope,
        // pass any data to modal controller here:
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
      });
      // Optional: can use this to select an item bound to the modal
      modalInstance.result.then(
              // user clicked Ok
              function (selectedItem) {
                if (selectedItem) {
                  $scope.selected = selectedItem;
                  $scope.madeSelection = true;
                }
              },
              // user clicked Cancel
                      function () {
                        $scope.madeSelection = false;
                      });
            };
  }
]);


