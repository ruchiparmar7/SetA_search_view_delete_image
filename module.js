const app = angular.module("myApp",[])
app.controller("myCTRL",($scope, $http)=>{
    $scope.pri= 0;
    $scope.sto= "";
    $scope.qty= 0;

    $scope.list = []
    $scope.getData = ()=>{
        $http.get("/api/mobile").then((response)=>{
            $scope.list = response.data;
        })
    }
    
    $scope.displayData = (item)=>{
        $scope.qty = item.quantity;
        $scope.pri = item.price;
        $scope.sto = item.storage;
    }

    $scope.delete = (item) =>{
        $http.delete(`/api/mobile/${item.mobileId}`).then(function(response){ 
            $scope.list = response.data 
            $scope.getData(); 
            }) 
    }
    
    $scope.getData();
})