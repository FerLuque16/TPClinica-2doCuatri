import { trigger, animate, transition, style, group, query, animateChild } from '@angular/animations';



export const misAnimaciones = trigger('routeAnimations',[
    transition('Bienvenido => Auth',slideTo('right')),
    transition('* => Home',slideTo('left')),
    transition('* => Estadisticas',slideTo('left')),
    transition('* => PacientesAtendidos',slideTo('right')),
    transition('* => Turnos', enterAndLeave()),
    transition('* => Perfil', slideTo('left')),
    transition('* => Usuarios',enterAndLeave()),
    transition('Auth => Bienvenido',slideTo('left')),
    transition('Estadisticas => *',slideTo('left')),
    transition('PacientesAtendidos => *',slideTo('left')),
    
])

  function slideTo(direction:any) {
    const optional = { optional: true };
    return [
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          [direction]: 0,
          width: '100%'
        })
      ], optional),
      query(':enter', [
        style({ [direction]: '-100%'})
      ]),
      group([
        query(':leave', [
          animate('600ms ease', style({ [direction]: '100%'}))
        ], optional),
        query(':enter', [
          animate('600ms ease', style({ [direction]: '0%'}))
        ])
      ]),
      //Normalize the page style... Might not be necessary
  
      //Required only if you have child animations on the page
       query(':leave', animateChild()),
      query(':enter', animateChild()),
    ];
}

  function enterAndLeave(){
    return [
      query(':enter, :leave', [
        style({
          position: 'absolute',
          left: 0,
          width: '100%',
          opacity: 0,
          transform: 'scale(0) translateY(100%)',
        }),
      ]),
      query(':enter', [
        animate('600ms ease', style({ opacity: 1, transform: 'scale(1) translateY(0)' })),
      ]),
    ]
  }
// export const slideInAnimation = trigger('slideInAnimation', [
 
//     transition('* <=> *', [
        
//         query(':enter, :leave', style({ position: 'fixed', width: '100%', zIndex: 2 }), { optional: true }),
//         // group block executes in parallel
//         group([
//         query(':enter', [
//             style({ transform: 'translateX(100%)' }),
//             animate('0.5s ease-out', style({ transform: 'translateX(0%)' }))
//         ], { optional: true }),
//         query(':leave', [
//             style({ transform: 'translateX(0%)' }),
//             animate('0.5s ease-out', style({ transform: 'translateX(-100%)' }))
//         ], { optional: true })
//         ])
//     ]),
//     transition('* <=> Perfil',enterAndLeave())

// ]);


